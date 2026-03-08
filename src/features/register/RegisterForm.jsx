import SideImage from '../../assets/img/Side-Image.png'
import Button from '../../components/Button';
import Input from '../../components/Input';
import GoogleIcon from '../../assets/icons/Icon-Google.svg'
import { Link } from 'react-router-dom';

function RegisterForm() {
  return (
    <div className='flex flex-row items-center gap-50'>
      <img src={SideImage} className='w-149.25 h-146.25 mr-20 my-30'/>
      <div className='flex flex-col gap-12.5 items-center '>
      <div className='flex flex-col gap-6 tacking-[4%] '>
      <h1 className='text-[36px] font-medium'>Create your account</h1>
      <p className='text-[18px]'>Enter your details below</p>
      </div>
      <div className='flex flex-col gap-10  w-92.75'>
      <div className='flex flex-row gap-15'>
        <Input placeholder='First Name' name='F_Name'   className=' py-2 w-38.75'/>
        <Input placeholder='Last Name' name='L_Name'   className=' py-2 w-38.75'/>
      </div>
      <Input placeholder='Email' name='Email'  className=' py-2'/>
      <Input type='password' placeholder='Password' name='password'  className=' py-2'/>
      <Input type='password' placeholder='Confirm Password' name='confirm_pass'  className=' py-2'/>
      </div>
      <div className='flex flex-col gap-4 items-center'>
      <Button children="Create your account" size='lg'/>
      <Button size='lg' variant='outline' className='gap-2'>
      <img src={GoogleIcon} className='w-6 h-6 mr-1.25'/>
      Sign up using Google  
      </Button>
      </div>
      <p className='text-[18px] flex gap-4 '>You already have an account?
         <p style={{ textDecoration: 'underline' }} className='text-[rgb(var(--color-primary-main))]'><Link to='/login'>Log in </Link></p></p>
      </div>
    </div>
  );
}

export default RegisterForm;
