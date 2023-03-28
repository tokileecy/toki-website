class Api {
  getData = async (locale = 'zh-Hant-TW') => {
    try {
      const profileRes = await fetch(
        `https://toki-site-cms.stage.tokilab.space/api/profile?populate=deep,5&locale=${locale}`
      )

      const profileData = await profileRes.json()

      return {
        id: profileData.data.id,
        name: profileData.data.attributes.name,
        description: profileData.data.attributes.description,
        skillCategories: profileData.data.attributes.skill_categories.data.map(
          (skillCategorie) => ({
            id: skillCategorie.id,
            name: skillCategorie.attributes.name,
            description: skillCategorie.attributes.description,
            skills: skillCategorie.attributes.skills.data.map((skill) => ({
              id: skill.id,
              name: skill.attributes.name,
              level: skill.attributes.level,
            })),
          })
        ),
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new Api()
