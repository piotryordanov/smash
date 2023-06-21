import {Formik, Field, Form, ErrorMessage} from 'formik'
import {registerSchema} from './validationSchema'

export const RegisterForm = ({styles}) => (
  <>
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={registerSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <Form>
        <label className={styles.label} htmlFor='name'> Full Name </label>
        <Field className={styles.field} id='username' name='username' />
        <ErrorMessage component='a' className={styles.errorMsg} name='username' />

        <label className={styles.label} htmlFor='Email'>
          Email
        </label>
        <Field className={styles.field} id='email' name='email' />
        <ErrorMessage component='a' className={styles.errorMsg} name='email' />

        <label className={styles.label} htmlFor='password'>
          Password
        </label>
        <Field className={styles.field} id='password' name='password' />
        <ErrorMessage component='a' className={styles.errorMsg} name='password' />
        <div className='mt-8'>
          <button type='submit' className={styles.button}>
            Register
          </button>
        </div>
      </Form>
    </Formik>
  </>
)
