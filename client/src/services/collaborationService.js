import api from "./api";

// ==========================================
// Get Freelancer Collaborations
// ==========================================
export const getMyCollaborations = async () => {
  const { data } = await api.get(
    "/applications/collaborations"
  );

  return data;
};

// ==========================================
// Submit Project - Freelancer
// ==========================================
export const submitProject = async ({
  applicationId,
  message,
  liveDemoUrl,
  files,
}) => {
  const { data } = await api.post(
    `/applications/${applicationId}/submit`,
    {
      message,
      liveDemoUrl,
      files,
    }
  );

  return data;
};

// ==========================================
// Get Messages
// ==========================================
export const getMessages = async (projectId) => {
  const { data } = await api.get(
    `/collaboration/projects/${projectId}/messages`
  );

  return data;
};

// ==========================================
// Send Message
// ==========================================
export const sendMessage = async ({
  projectId,
  payload,
}) => {
  const { data } = await api.post(
    `/collaboration/projects/${projectId}/messages`,
    payload
  );

  return data;
};

// ==========================================
// Upload Collaboration File
// ==========================================
export const uploadCollaborationFile = async ({
  projectId,
  file,
}) => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    `/collaboration/projects/${projectId}/files`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// ==========================================
// Update Milestone Progress
// ==========================================
export const updateMilestoneProgress = async ({
  milestoneId,
  progress,
}) => {
  const { data } = await api.patch(
    `/collaboration/milestones/${milestoneId}`,
    {
      progress,
    }
  );

  return data;
};