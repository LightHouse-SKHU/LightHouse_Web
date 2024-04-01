import { Link } from 'react-router-dom'
import './Grade.css'

const Grade = () => {

    return (
        <>
            <div className='Grade'>
                <div className="boardBtn">
                    <Link to='/Question' className='Nav' id='Q1'>전체 문제</Link>
                    <hr />
                    <Link to='/Grade1' className="Nav" id='Q2'>1학년 문제</Link><br />
                    <Link to='/Grade2' className="Nav">2학년 문제</Link><br />
                    <Link to='/Grade3' className="Nav">3학년 문제</Link>
                </div>
                <div className='Level'>
                    
                </div>
            </div>
        </>
    )
}

export default Grade;