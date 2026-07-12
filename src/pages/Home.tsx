import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';

export function Home() {
  return (
    <div className="home-hero-block">
      <div className="hero-portrait">
        <img src="images/profile-hero.png" alt="pixel art portrait of allan" />
      </div>

      <AnimatedSection direction="top" className="hero">
        <div className="hero-copy">
          <h1>hey, i'm allan.</h1>
          <p>
            this is my little corner of the internet for showing friends the stuff i'm into &mdash; ranked
            opinions, works in progress, and whatever <span className="text-highlight">ttrpg system</span> i'm
            currently breaking and rebuilding.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection direction="left" className="card-grid">
        <Link to="/top10" className="card">
          <h3>top 10s</h3>
          <p>my ranked lists of games, books, food, and anything else worth arguing about.</p>
        </Link>
        <Link to="/devlog" className="card">
          <h3>Dungeon Rift</h3>
          <p>progress notes and changelogs for the tabletop system i'm designing.</p>
        </Link>
      </AnimatedSection>
    </div>
  );
}
