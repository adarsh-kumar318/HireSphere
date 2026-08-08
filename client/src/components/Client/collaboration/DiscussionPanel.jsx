import {
  MessageCircle,
} from "lucide-react";


const DiscussionPanel = ({
  messages = [],
  currentUserId,
}) => {


  if (!messages.length) {

    return (
      <div
        className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"
      >

        <MessageCircle
          size={32}
          className="mx-auto text-slate-400"
        />


        <p
          className="mt-3 text-sm text-slate-500 dark:text-slate-400"
        >
          No discussions yet.
        </p>


      </div>
    );

  }




  return (

    <div
      className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >

      <h3
        className="text-lg font-semibold text-slate-900 dark:text-white"
      >
        Project Discussion
      </h3>





      <div
        className="mt-5 space-y-4"
      >

        {messages.map((message)=>(

          <div
            key={message._id}
            className={`flex

              ${
                message.sender?._id === currentUserId
                  ? "justify-end"
                  : "justify-start"
              }
            `}
          >


            <div
              className={`max-w-[85%] rounded-2xl p-4

                ${
                  message.sender?._id === currentUserId

                  ? `bg-blue-600 text-white`

                  :

                  `
                    bg-slate-100
                    text-slate-900
                    dark:bg-slate-800
                    dark:text-white
                  }`
                }
              `}
            >



              <p
                className="text-sm leading-6"
              >
                {message.text}
              </p>



              <div
                className={`mt-2 flex items-center gap-2 text-xs

                  ${
                    message.sender?._id === currentUserId

                    ? "text-blue-100"

                    :

                    "text-slate-500 dark:text-slate-400"
                  }
                `}
              >

                <span>
                  {message.sender?.name}
                </span>


                <span>
                  •
                </span>


                <span>
                  {message.time}
                </span>


              </div>



            </div>


          </div>

        ))}


      </div>


    </div>

  );
};


export default DiscussionPanel;