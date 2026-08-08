import ProjectCard from "./ProjectCard";
import EmptyProjects from "./EmptyProjects";

const ProjectList = ({ projects = [] }) => {
  if (!projects.length) {
    return <EmptyProjects />;
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project._id || project.id}
          project={project}
        />
      ))}
    </div>
  );
};

export default ProjectList;