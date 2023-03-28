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
        works: profileData.data.attributes.works.data.map((work) => ({
          id: work.id,
          name: work.attributes.name,
          banner: {
            id: work.attributes.banner.data.id,
            name: work.attributes.banner.data.attributes.name,
            alternativeText:
              work.attributes.banner.data.attributes.alternativeText,
            caption: work.attributes.banner.data.attributes.caption,
            width: work.attributes.banner.data.attributes.width,
            height: work.attributes.banner.data.attributes.height,
            formats: work.attributes.banner.data.attributes.formats,
            hash: work.attributes.banner.data.attributes.hash,
            ext: work.attributes.banner.data.attributes.ext,
            mime: work.attributes.banner.data.attributes.mime,
            size: work.attributes.banner.data.attributes.size,
            url: work.attributes.banner.data.attributes.url,
          },
        })),
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new Api()
