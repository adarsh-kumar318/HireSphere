import { useState } from 'react'
import { toast } from 'react-toastify'
import SkillEditor from '../../components/Student/SkillEditor'
import PageHeader from '../../components/Common/PageHeader'
import { saveSkills } from '../../services/studentService'

function Skills() {
  const [skills, setSkills] = useState(['React', 'Node.js', 'MongoDB'])
  const [value, setValue] = useState('')

  const addSkill = () => {
    const skill = value.trim()
    if (!skill || skills.includes(skill)) return
    setSkills((current) => [...current, skill])
    setValue('')
  }

  const removeSkill = (skill) => {
    setSkills((current) => current.filter((item) => item !== skill))
  }

  const handleSave = async () => {
    try {
      await saveSkills(skills)
      toast.success('Skills saved')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Skills endpoint is not responding yet')
    }
  }

  return (
    <>
      <PageHeader
        title="Skills"
        subtitle="Add technical and professional skills for job matching."
        action={<button className="btn btn-primary" type="button" onClick={handleSave}>Save Skills</button>}
      />
      <SkillEditor skills={skills} value={value} onValueChange={setValue} onAdd={addSkill} onRemove={removeSkill} />
    </>
  )
}

export default Skills
