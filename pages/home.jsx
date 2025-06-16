import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCountries,
  setFilter,
  loadNextPage,
} from "../store/slices/countriesSlice";
import {
  Container,
  Carousel,
  Nav,
  Row,
  Col,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { BiMenu } from "react-icons/bi";
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import styles from "../styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const { all, status, error, regionFilter, page, perPage } = useSelector(
    (state) => state.countries
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    if (status === "idle") dispatch(fetchCountries());
  }, [status, dispatch]);

  const regions = ["All", ...new Set(all.map((c) => c.region).filter(Boolean))];
  const filtered =
    regionFilter === "All" ? all : all.filter((c) => c.region === regionFilter);
  const visible = filtered.slice(0, page * perPage);

  return (
    <Container className={`pt-4 ${styles.wrapper}`}>
      <div
        className={`d-flex align-items-center justify-content-between ${styles.topBar}`}
      >
        <div className={styles.countryLabel}>Countries</div>

        <Nav fill className={`d-none d-md-flex ${styles.tabs}`}>
          {regions.map((region) => (
            <Nav.Item key={region}>
              <Nav.Link
                className={`${styles.tabItem} ${
                  regionFilter === region ? styles.activeTab : ""
                }`}
                onClick={() => dispatch(setFilter(region))}
              >
                {region}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <div className="d-md-none">
          <Button
            variant="light"
            className={styles.menuButton}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <BiMenu size={22} />
          </Button>
          {showMobileMenu && (
            <div className={styles.mobileDropdown}>
              {regions.map((region) => (
                <div
                  key={region}
                  className={`${styles.dropdownItem} ${
                    regionFilter === region ? styles.activeTab : ""
                  }`}
                  onClick={() => {
                    dispatch(setFilter(region));
                    setShowMobileMenu(false);
                  }}
                >
                  {region}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-4 text-center">
        <div className="d-md-none">
          <div className={styles.mobileLine}></div>
          <h6 className={`mt-2 mb-2 ${styles.pageTitle}`}>WELCOME</h6>
          <div className={styles.mobileLine}></div>
        </div>

        <div
          className={`d-none d-md-flex justify-content-center align-items-center ${styles.pageTitleWrapper}`}
        >
          <div className={styles.line}></div>
          <h6 className={`mx-3 ${styles.pageTitle}`}>WELCOME</h6>
          <div className={styles.line}></div>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <div className={`d-block d-md-none ${styles.sideBanner}`}>
          <img src="images/sideBanner.jpg" alt="sideBanner" />
        </div>

        <div className={styles.sliderSection}>
          <Carousel controls indicators className={styles.carousel}>
            {[1, 2, 3].map((i) => (
              <Carousel.Item key={i}>
                <div className={styles.slide}>
                  <img src={`/images/sliderImage${i}.jpg`} alt={`Slide ${i}`} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className={`d-none d-md-block ${styles.sideBanner}`}>
          <img src="images/sideBanner.jpg" alt="sideBanner" />
        </div>
      </div>

      {status === "loading" && <Spinner animation="border" />}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <>
          <Row className="gy-3 mt-3">
            {visible.map((c) => (
              <Col key={c.name} xs={12} md={6}>
                <Card className={styles.countryCard}>
                  <Card.Body className="d-flex align-items-center">
                    <img src={c.flag} alt={c.name} className={styles.flag} />
                    <div className="ms-3">
                      <Card.Title className="mb-1">{c.name}</Card.Title>
                      <Card.Text className="text-muted">{c.region}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {visible.length < filtered.length && (
            <div className="text-center mt-4">
              <Button
                className={styles.loadMore}
                onClick={() => dispatch(loadNextPage())}
              >
                Load more
              </Button>
            </div>
          )}
        </>
      )}

      <footer className={`text-center mt-5 mb-5 ${styles.footer}`}>
        <div className="d-flex justify-content-center gap-3">
          {[FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter].map((Icon, idx) => (
            <div
              key={idx}
              className="d-flex align-items-center justify-content-center border border-dark rounded-circle"
              style={{
                width: 38,
                height: 38,
                cursor: "pointer",
              }}
            >
              <Icon size={16} className="text-dark" />
            </div>
          ))}
        </div>
        <div className="mt-3 small">super@email.com</div>
        <div className="small text-muted">
          Copyright © 2025 Super. All rights reserved.
        </div>
      </footer>
    </Container>
  );
}
