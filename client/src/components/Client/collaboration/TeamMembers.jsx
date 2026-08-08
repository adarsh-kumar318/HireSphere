import {
  Users,
} from "lucide-react";


const TeamMembers = ({
  members = [],
}) => {


  if (!members.length) {

    return (
      <div
        className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-900"
      >

        <Users
          size={30}
          className="mx-auto text-slate-400"
        />


        <p
          className="mt-3 text-sm text-slate-500 dark:text-slate-400"
        >
          No team members added yet.
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
        Team Members
      </h3>




      <div
        className="mt-5 space-y-4"
      >

        {members.map((member)=>(

          <div
            key={member._id}
            className="flex items-center gap-4"
          >

            <img
              src={
                member.avatar ||
                "/default-avatar.png"
              }
              alt={member.name}
              className="h-12 w-12 rounded-full object-cover"
            />



            <div>

              <h4
                className="font-medium text-slate-900 dark:text-white"
              >
                {member.name}
              </h4>


              <p
                className="text-sm text-slate-500 dark:text-slate-400"
              >
                {member.role}
              </p>


            </div>


          </div>

        ))}


      </div>


    </div>

  );
};


export default TeamMembers;