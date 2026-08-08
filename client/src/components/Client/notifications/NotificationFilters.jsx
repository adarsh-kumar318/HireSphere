const filters = [
  {
    label: "All",
    value: "all",
  },

  {
    label: "Unread",
    value: "unread",
  },

  {
    label: "Payments",
    value: "payment",
  },

  {
    label: "Projects",
    value: "project",
  },

  {
    label: "Messages",
    value: "message",
  },

  {
    label: "Meetings",
    value: "meeting",
  },
];



const NotificationFilters = ({
  activeFilter = "all",
  onChange,
}) => {


  return (

    <div
      className="flex gap-3 overflow-x-auto pb-2"
    >

      {filters.map((filter)=>(


        <button
          key={filter.value}
          type="button"
          onClick={() =>
            onChange?.(filter.value)
          }
          className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition


            ${
              activeFilter === filter.value

              ? `bg-blue-600 text-white`

              :

              `
                bg-slate-100
                text-slate-600
                hover:bg-slate-200
                dark:bg-slate-800
                dark:text-slate-300
                dark:hover:bg-slate-700
              }`
            }
          `}
        >

          {filter.label}

        </button>


      ))}


    </div>

  );

};


export default NotificationFilters;