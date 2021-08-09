import WorkBlock from '../../../../components/WorkBlock'

const blogImg = '/blog.png'

export default function WorkBlockBox(): JSX.Element {
  return (
    <WorkBlock
      works={[
        {
          name: 'blog',
          title: 'Blog',
          imgElement: <img src={blogImg} />,
        },
        {
          name: 'blog1',
          title: 'Blog',
          imgElement: <img src={blogImg} />,
        },
        {
          name: 'blog2',
          title: 'Blog',
          imgElement: <img src={blogImg} />,
        },
        {
          name: 'blog3',
          title: 'Blog',
          imgElement: <img src={blogImg} />,
        },
      ]}
      // classes={{
      //   contactFieldset: css`
      //     padding: 20px 50px;
      //   `,
      // }}
    />
  )
}
