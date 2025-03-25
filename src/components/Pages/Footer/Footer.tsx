import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContent}></div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
          <div className={styles.paymentMethods}>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
