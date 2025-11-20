import {Link} from 'react-router-dom';
import "../css/common.css";


const Footer = () => {
    return (
        <>
            <footer className="">
                <div className="mainFooter layoutCenter">
                    <div className="footerLogo">
                        <h1>JOB-A-YO</h1>
                    </div>
                    <div className="footerInfo">
                        <div className="footerInfoL">
                            <p>대구광역시 중구 중앙대로 366</p>
                            <p>임과 함께</p>
                            <p>admin@gmail.com</p>
                            <p>053-123-4567</p>
                        </div>
                        <div className="footerInfoR">
                            <ul className="site">
                                <li><Link to="/notice" />FAQ</li>
                                <li><Link to="/sitemap" />사이트맵</li>
                            </ul>
                            <ul className="related">
                                <li><Link to="/related" />관련기관정보</li>
                            </ul>
                            <ul className="personInfo">
                                <li><Link to="/personal" />개인정보처리방침</li>
                                <li><Link to="/use" />이용약관</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        
        </>
    )


}
export default Footer;