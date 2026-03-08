import SideImage from '../../assets/img/Side-Image.png'
import Button from '../../components/Button';
import Input from '../../components/Input';
import GoogleIcon from '../../assets/icons/Icon-Google.svg'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function RegisterForm() {
  const {t }= useTranslation()
  return (
    <div className='w-full max-w-full flex justify-center lg:justify-normal flex-row items-center lg:gap-50 overflow-hidden'>
    <img src={SideImage} className='hidden lg:block lg:w-[45%] h-auto my-30 shrink-0'/>
      <div className='flex flex-col gap-12.5 items-center '>
      <div className='flex flex-col gap-6 tacking-[4%] items-start'>
      <h1 className='text-[36px] font-medium'>{t("register.create")}</h1>
      <p className='text-[18px]'>{t("details")}</p>
      </div>
      <div className='flex flex-col gap-10  w-92.75'>
      <div className='flex flex-row gap-15'>
        <Input placeholder={`${t("register.first_name")}`} name='F_Name'   className=' py-2 w-38.75'/>
        <Input placeholder={`${t("register.last_name")}`} name='L_Name'   className=' py-2 w-38.75'/>
      </div>
      <Input placeholder={`${t("email")}`} name='Email'  className=' py-2'/>
      <Input type='password' placeholder={`${t("password")}`} naSme='password'  className=' py-2'/>
      <Input type='password' placeholder={`${t("register.confirm_password")}`} name='confirm_pass'  className=' py-2'/>
      </div>
      <div className='flex flex-col gap-4 items-center'>
      <Button  size='lg'>{t("register.create")}</Button>
      <Button size='lg' variant='outline' className='gap-2'>
      <img src={GoogleIcon} className='w-6 h-6 mr-1.25'/>
      {t("register.google")} 
      </Button>
      </div>
      <p className='text-[18px] flex gap-4 '>{t("register.have_account")}
         <p className='underline text-[rgb(var(--color-primary-main))]'><Link to='/login'>Log in </Link></p></p>
      </div>
    </div>
  );
}

export default RegisterForm;
