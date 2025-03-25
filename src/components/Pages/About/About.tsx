import styles from "./About.module.css";
const About = () => {
  return (
    <div className={styles.main_box}>
      <div className={styles.body_container}>
        <main className={styles.main}>
          <section className={styles.about}>
            <h1 className={styles.title}>About Us</h1>
            <div className={styles.content}>
              <div className={styles.imageContainer}>
                <img
                  src="https://www.shutterstock.com/image-photo/composite-collage-picture-image-excited-600nw-2376258293.jpg"
                  className={styles.imagePlaceholder}
                />
              </div>
              <div className={styles.text}>
                <h2>Our Story</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie
                  vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
                  porttitor. Ut in nulla enim.
                </p>
                <p>
                  Suspendisse in justo eu magna luctus suscipit. Sed lectus.
                  Integer euismod lacus luctus magna. Quisque cursus, metus
                  vitae pharetra auctor, sem massa mattis sem, at interdum magna
                  augue eget diam.
                </p>
                <h2>Our Mission</h2>
                <p>
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia Curae; Morbi lacinia molestie dui.
                  Praesent blandit dolor. Sed non quam. In vel mi sit amet augue
                  congue elementum. Morbi in ipsum sit amet pede facilisis
                  laoreet.
                </p>
              </div>
            </div>

            <div className={styles.team}>
              <h2>Our Team</h2>
              <div className={styles.members}>
                <div className={styles.member}>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={styles.memberImage}
                  />
                  <h3>Jane Doe</h3>
                  <p>Founder & CEO</p>
                </div>
                <div className={styles.member}>
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={styles.memberImage}
                  />
                  <h3>John Smith</h3>
                  <p>CTO</p>
                </div>
                <div className={styles.member}>
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={styles.memberImage}
                  />
                  <h3>Emily Johnson</h3>
                  <p>Design Lead</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default About;
