import gql from 'graphql-tag';

const GET_PAGES = gql`
  query {
    pages {
      id
      title
      subTitle
      created_by
      description
      meta_desc
      keywords
      image
      sectionNumber
      category {
        title
        slug
      }
      updated_at
      updated_by
      created_at
    }
  }
`;

const GET_RETAILERS = gql`
  query {
    retailers {
      id
      name
      logo
      location
    }
  }
`;

const GET_MEMBERS = gql`
  query {
    members {
      id
      photo
      fullname
      position
      department
    }
  }
`;

const GET_SOCAIL_MEDIA = gql`
  query {
    socailMedia {
      logo
      link
      name
    }
  }
`;

export { GET_PAGES, GET_RETAILERS, GET_MEMBERS, GET_SOCAIL_MEDIA };
