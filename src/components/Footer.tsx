import { FC } from "react";

interface FooterProps {
  sharedBasicInfo: any;
}

const Footer: FC<FooterProps> = ({ sharedBasicInfo }) => {
  const networks = sharedBasicInfo?.social?.map((network: any) => (
    <span key={network.name} className="m-4">
      <a href={network.url} target="_blank" rel="noopener noreferrer">
        <i className={network.class}></i>
      </a>
    </span>
  ));

  return (
    <footer>
      <div className="col-md-12">
        <div className="social-links">{networks}</div>

        <div className="copyright py-4 text-center">
          <div className="container">
            <small className="info-footer">
              Copyright &copy; {sharedBasicInfo ? sharedBasicInfo.name : ""}
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
