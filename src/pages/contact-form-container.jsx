import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'

const createContactMutation = gql`
  mutation CreateContact($firstName: String!, $lastName: String!, $caseRole: String!, $email: String!, $caseId: ID!) {
    createContact(firstName: $firstName, lastName: $lastName, caseRole: $caseRole, email: $email, caseId: $caseId) {
      path
      message
    }
  }
`

const ContactFormContainer = props => {
  const [mutate] = useMutation(createContactMutation)

  async function submit(values) {
    const { data } = await mutate({
      variables: values
    })
    if (data) {
      return data.signup
    }
    return null
  }

  function onFinish() {
    props.history.push('/')
  }

  return props.children({ submit, onFinish })
}

export default ContactFormContainer