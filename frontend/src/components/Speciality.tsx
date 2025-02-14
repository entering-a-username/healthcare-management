import { Link } from 'react-router-dom';

interface SpecialityProps {
  speciality: {
      speciality: string;
      image: string;
  };
}

export default function Speciality({ speciality }: SpecialityProps) {

  return (
    <Link onClick={() => scrollTo(0, 0)} to={`/doctors`}>
        <img src={`/src/assets/img/${speciality.image.toLowerCase()}.png`} alt="" />
        <p>{speciality.speciality}</p>
    </Link>
  )
}