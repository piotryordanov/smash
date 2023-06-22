import {Formik, Field, Form, ErrorMessage} from 'formik'
import {loginSchema} from './validationSchema'
import * as Yup from 'yup'

export const LoginForm = ({styles, supabase}) => (
  <>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        })
      }}
    >
      <Form>
        <label className={styles.label} htmlFor='Email'>
          Email
        </label>
        <Field className={styles.field} id='email' name='email' />
        <ErrorMessage component='a' className={styles.errorMsg} name='email' />
        <label className={styles.label} htmlFor='Email'>
          Password
        </label>
        <Field className={styles.field} id='password' name='password' />

        <ErrorMessage
          component='a'
          className={styles.errorMsg}
          name='password'
        />
        <div className='mt-8'>
          <button type='submit' className={styles.button}>
            Login
          </button>
        </div>
      </Form>
    </Formik>
  </>
)
