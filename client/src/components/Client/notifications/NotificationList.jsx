import NotificationCard from "./NotificationCard";


const NotificationList = ({
  notifications = [],
  loading = false,
  onClick,
}) => {



  // Loading State

  if (loading) {

    return (
      <div
        className="space-y-5"
      >

        {[1,2,3].map((item)=>(

          <div
            key={item}
            className="h-32 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
          />

        ))}


      </div>
    );

  }







  // Empty State

  if (!notifications.length) {

    return null;

  }






  return (

    <div
      className="space-y-5"
    >

      {notifications.map((notification)=>(


        <NotificationCard

          key={notification._id}

          notification={notification}

          onClick={onClick}

        />


      ))}


    </div>

  );

};


export default NotificationList;