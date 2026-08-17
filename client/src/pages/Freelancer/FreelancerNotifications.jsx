import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  ClipboardList,
  FileText,
  Mail,
  MessageSquare,
  Sparkles,
  WalletCards,
} from "lucide-react";

import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../services/notificationService";

function FreelancerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);
  const [activeTab, setActiveTab] = useState("recent");
  const [error, setError] = useState("");

  // =========================================================
  // FETCH NOTIFICATIONS
  // =========================================================
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyNotifications();

      setNotifications(data?.notifications || []);
    } catch (err) {
      console.error("NOTIFICATIONS ERROR:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadNotifications = async () => {
      await fetchNotifications();
    };

    loadNotifications();
  }, []);

  // =========================================================
  // COUNTS
  // =========================================================
  const allCount = notifications.length;

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const readCount = notifications.filter(
    (notification) => notification.isRead
  ).length;

  // =========================================================
  // IMPORTANT NOTIFICATIONS
  // =========================================================
  const importantTypes = [
    "application_status",
    "payment",
    "project",
    "milestone",
  ];

  const displayedNotifications = useMemo(() => {
    if (activeTab === "important") {
      return notifications.filter((notification) =>
        importantTypes.includes(notification.type)
      );
    }

    return notifications;
  }, [notifications, activeTab]);

  // =========================================================
  // MARK ONE AS READ
  // =========================================================
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);

      setNotifications((previous) =>
        previous.map((notification) =>
          notification._id === notificationId
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );
    } catch (err) {
      console.error("MARK AS READ ERROR:", err);
    }
  };

  // =========================================================
  // MARK ALL AS READ
  // =========================================================
  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    try {
      setMarkingAll(true);

      await markAllNotificationsAsRead();

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (err) {
      console.error("MARK ALL AS READ ERROR:", err);
    } finally {
      setMarkingAll(false);
    }
  };

  // =========================================================
  // NOTIFICATION ICON
  // =========================================================
  const getNotificationIcon = (type) => {
    switch (type) {
      case "application":
        return <ClipboardList size={17} />;

      case "application_status":
        return <Check size={17} />;

      case "message":
        return <MessageSquare size={17} />;

      case "project":
        return <FileText size={17} />;

      case "milestone":
        return <Sparkles size={17} />;

      case "payment":
        return <WalletCards size={17} />;

      case "system":
      default:
        return <Bell size={17} />;
    }
  };

  // =========================================================
  // NOTIFICATION ICON BACKGROUND
  // =========================================================
  const getIconBackground = (type) => {
    switch (type) {
      case "application_status":
        return "bg-indigo-500/15 text-indigo-300";

      case "message":
        return "bg-violet-500/15 text-violet-300";

      case "payment":
        return "bg-emerald-500/15 text-emerald-300";

      case "milestone":
        return "bg-amber-500/15 text-amber-300";

      case "project":
        return "bg-cyan-500/15 text-cyan-300";

      case "application":
        return "bg-blue-500/15 text-blue-300";

      default:
        return "bg-slate-500/15 text-slate-300";
    }
  };

  // =========================================================
  // RELATIVE TIME
  // =========================================================
  const getRelativeTime = (date) => {
    if (!date) return "";

    const now = new Date();
    const notificationDate = new Date(date);

    const difference = now - notificationDate;

    if (difference < 0) return "Just now";

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    if (days === 1) {
      return "Yesterday";
    }

    if (days < 7) {
      return `${days} days ago`;
    }

    return notificationDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // OPEN NOTIFICATION
  // =========================================================
  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await handleMarkAsRead(notification._id);
    }

    if (notification.link) {
      useEffect(() => {
        window.location.href = notification.link;
      }, [notification.link]);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="min-h-full bg-[#061525] px-6 py-5 text-white">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-8">
            <div className="h-9 w-56 animate-pulse rounded bg-slate-800" />
            <div className="mt-3 h-4 w-80 animate-pulse rounded bg-slate-800" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[74px] animate-pulse rounded-md bg-[#142438]"
              />
            ))}
          </div>

          <div className="mt-8 h-[320px] animate-pulse rounded-md bg-[#0d1e30]" />
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================
  return (
    <div className="min-h-full bg-[#061525] px-5 py-5 text-white md:px-7">
      <div className="mx-auto max-w-[1100px]">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-medium tracking-tight text-[#edf4ff]">
              Notifications
            </h1>

            <p className="mt-1 text-[12px] text-slate-300">
              New gigs, proposal decisions, payments, and reviews.
            </p>
          </div>

          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0 || markingAll}
            className="mt-1 flex items-center gap-2 rounded-sm border border-slate-700 bg-transparent px-3 py-2 text-[10px] text-slate-200 transition hover:border-indigo-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={13} />

            {markingAll
              ? "Marking..."
              : "Mark all as read"}
          </button>
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}
        {error && (
          <div className="mb-5 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300">
            {error}
          </div>
        )}

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* ALL */}
          <button
            type="button"
            onClick={() => setActiveTab("recent")}
            className={`flex h-[72px] items-center justify-between rounded-md border px-4 text-left transition ${
              activeTab === "recent"
                ? "border-slate-700 bg-[#182b40]"
                : "border-transparent bg-[#142438] hover:bg-[#182b40]"
            }`}
          >
            <div>
              <p className="text-[9px] uppercase tracking-wide text-slate-300">
                Total
              </p>

              <p className="mt-1 text-[14px] font-medium text-slate-100">
                All ({allCount})
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#293c55] text-slate-300">
              <Mail size={15} />
            </div>
          </button>

          {/* UNREAD */}
          <div className="flex h-[72px] items-center justify-between rounded-md border border-slate-700 bg-[#182b40] px-4">
            <div>
              <p className="text-[9px] uppercase tracking-wide text-slate-300">
                Action Required
              </p>

              <p className="mt-1 text-[14px] font-medium text-slate-100">
                Unread ({unreadCount})
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#293c55] text-slate-300">
              <Bell size={15} />
            </div>
          </div>

          {/* READ */}
          <div className="flex h-[72px] items-center justify-between rounded-md border border-transparent bg-[#0d1e30] px-4">
            <div>
              <p className="text-[9px] uppercase tracking-wide text-slate-300">
                Archived
              </p>

              <p className="mt-1 text-[14px] font-medium text-slate-100">
                Read ({readCount})
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#182c42] text-slate-400">
              <Mail size={15} />
            </div>
          </div>
        </div>

        {/* =====================================================
            NOTIFICATION PANEL
        ===================================================== */}
        <div className="mt-8 overflow-hidden rounded-md border border-slate-800/70 bg-[#0d1e30]">
          {/* TABS */}
          <div className="flex h-[45px] items-end gap-5 border-b border-slate-800 px-4">
            <button
              type="button"
              onClick={() => setActiveTab("recent")}
              className={`relative h-full px-1 text-[10px] ${
                activeTab === "recent"
                  ? "text-white"
                  : "text-slate-400"
              }`}
            >
              Recent

              {activeTab === "recent" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-300" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("important")}
              className={`relative h-full px-1 text-[10px] ${
                activeTab === "important"
                  ? "text-white"
                  : "text-slate-400"
              }`}
            >
              Important

              {activeTab === "important" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-300" />
              )}
            </button>
          </div>

          {/* ===================================================
              EMPTY STATE
          =================================================== */}
          {displayedNotifications.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1b2d42] text-slate-400">
                <Bell size={20} />
              </div>

              <h3 className="text-sm font-medium text-slate-200">
                No notifications yet
              </h3>

              <p className="mt-2 max-w-[300px] text-[11px] leading-5 text-slate-400">
                You're all caught up. We'll notify you when
                something happens.
              </p>
            </div>
          )}

          {/* ===================================================
              NOTIFICATION LIST
          =================================================== */}
          {displayedNotifications.length > 0 && (
            <div>
              {displayedNotifications.map(
                (notification, index) => {
                  const unread = !notification.isRead;

                  return (
                    <div
                      key={notification._id}
                      onClick={() =>
                        handleNotificationClick(notification)
                      }
                      className={`group relative flex min-h-[80px] cursor-pointer items-center gap-4 border-b border-slate-800/80 px-4 py-4 transition last:border-b-0 ${
                        unread
                          ? "bg-[#15283b] hover:bg-[#192e44]"
                          : "bg-[#0d1e30] hover:bg-[#112439]"
                      }`}
                    >
                      {/* UNREAD LEFT LINE */}
                      {unread && (
                        <span className="absolute bottom-0 left-0 top-0 w-[2px] bg-indigo-300" />
                      )}

                      {/* ICON */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${getIconBackground(
                          notification.type
                        )}`}
                      >
                        {getNotificationIcon(
                          notification.type
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h3
                              className={`truncate text-[11px] ${
                                unread
                                  ? "font-medium text-white"
                                  : "font-normal text-slate-200"
                              }`}
                            >
                              {notification.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-slate-400">
                              {notification.message}
                            </p>

                            {/* MESSAGE ACTION */}
                            {notification.type ===
                              "message" &&
                              notification.link && (
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleNotificationClick(
                                      notification
                                    );
                                  }}
                                  className="mt-2 rounded-sm bg-indigo-300 px-2 py-1 text-[8px] font-medium text-[#081525] transition hover:bg-indigo-200"
                                >
                                  Open chat
                                </button>
                              )}
                          </div>

                          {/* TIME */}
                          <span className="shrink-0 pt-0.5 text-[8px] text-slate-400">
                            {getRelativeTime(
                              notification.createdAt
                            )}
                          </span>
                        </div>
                      </div>

                      {/* UNREAD DOT */}
                      {unread && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />
                      )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FreelancerNotifications;