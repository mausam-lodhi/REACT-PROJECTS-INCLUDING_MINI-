import pp from "./assets/pp.jpg";
import "./index.css";
function Card() {
  return (
    <div className='card'>
      <img src={pp} alt='card picture' className='ppimg' />
      <h2 className='title'>Mausam Lodhi</h2>
      <p className='para'>i am a student of DHSGSU</p>
    </div>
  );
}
export default Card;
