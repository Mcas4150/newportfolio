import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "@emotion/styled";
import Menu from "./tiles/Menu";
import { Squiggle } from "./animations/Squiggle";
import "./App.css";
import InfoDiscogs from "./info/info_discogs";
import AboutProjects from "./info/about_projects";
import AboutSynth from "./info/about_synth";
import InfoAbout from "./info/info_about";
import ReleasesList from "./discogs/releases_list";
import ReleasePage from "./discogs/release_page";
import ReleasePageInfo from "./discogs/release_page_info";
import ProjectsList from "./projects/ProjectsList";
import SynthMain from "./synth/synthMain";
import Tech from "./tiles/Tech";
import TechData from "./tiles/TechData";
import Title from "./tiles/Title";
import Social from "./tiles/social";
import Window from "./tiles/Window";
import AppContext from "./context-file";

const App = () => {
  const [dimensions, setDimensions] = useState({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
  });

  let TileStyle =
    dimensions.width <= 800 || dimensions.height <= 600
      ? TileStyleMin
      : TileStyleMax;

  const [showWindow, setShowWindow] = useState(false);

  const toggleWindow = () => {
    setShowWindow(!showWindow);
  };

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <Router>
      <AppContext.Provider value={{ showWindow, toggleWindow, dimensions }}>
        <Squiggle />
        <TileContainer style={TileStyle}>
          <TitleTile>
            <Title />
          </TitleTile>
          <MenuTile>
            <Menu />
          </MenuTile>
          <AboutTile>
            <AboutWindow title={"Info"}>
              <Switch>
                <Route exact path="/about" component={InfoAbout} />
                <Route exact path="/discogs" component={InfoDiscogs} />
                <Route exact path="/synth" component={AboutSynth} />
                <Route exact path="/projects" component={AboutProjects} />
                <Route
                  exact
                  path="/discogs/release/:id"
                  component={ReleasePageInfo}
                />
              </Switch>
            </AboutWindow>
          </AboutTile>
          <TechTile>
            <TechWindow title={"Tech"}>
              <Switch>
                <Route exact path="/about" component={Tech}>
                  {TechData.about}
                </Route>
                <Route path="/discogs" component={Tech}>
                  {TechData.discogs}
                </Route>
                <Route exact path="/synth" component={Tech}>
                  {TechData.synth}
                </Route>
                <Route exact path="/projects" component={Tech}>
                  {TechData.projects}
                </Route>
              </Switch>
            </TechWindow>
          </TechTile>
          <FeaturedTile>
            <FeaturedWindow title={"Title"}>
              <Switch>
                <Route exact path="/discogs" component={ReleasesList} />
                <Route exact path="/synth" component={SynthMain} />
                <Route exact path="/projects" component={ProjectsList} />
                <Route
                  exact
                  path="/discogs/release/:id"
                  component={ReleasePage}
                />
              </Switch>
            </FeaturedWindow>
          </FeaturedTile>
          <SocialTile>
            {" "}
            <Social />
          </SocialTile>
        </TileContainer>
      </AppContext.Provider>
    </Router>
  );
};

const TileContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  // background-color: #f5f4f0;
  display: grid;
  margin: auto;
  width: 100%;
  height: 100%;
  grid-gap: 0 0;
  -webkit-filter: saturate(1.2);
  filter: saturate(1.2);
`;

const TileStyleMax = {
  // margin: "25px",
  gridTemplateColumns: "repeat(12, 1fr) 25px",
  gridTemplateRows: "repeat(12, 1fr)",
  gridTemplateAreas: `'title title title about about about  featured featured featured featured featured featured'
    'menu . . about about about featured featured featured featured featured featured'
    'menu . . about about about featured featured featured featured featured featured'
    'menu . . about about about  featured featured featured featured featured featured'
    'menu . . . . .  featured featured featured featured featured featured'
    'menu . . tech tech tech featured featured featured featured featured featured'
    'menu . . tech tech tech featured featured featured featured featured featured'
    'menu . . tech tech tech featured featured featured featured featured featured'
    'menu . . . . . featured featured featured featured featured featured'
    'menu . . . . . featured featured featured featured featured featured'
    '. . . . . . . . . . . .'
    '. . . . . . . . . . . social'`,
  overflowY: "hidden",
};

const TileStyleMin = {
  // margin: "10px",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "repeat(12, 1fr)",
  gridTemplateAreas: `'title title '
    'menu menu'
    'about about'
    'about about'
    'tech tech'
    'tech tech'
    'featured featured'
    'featured featured'
    'featured featured'
    'featured featured'
    'featured featured'
    'featured featured'`,
  overflowY: "auto",
};

const Tile = styled.div`
  position: relative;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
`;

const TitleTile = styled(Tile)`
  grid-area: title;
`;

const MenuTile = styled(Tile)`
  grid-area: menu;
`;

const TechTile = styled(Tile)`
  grid-area: tech;
`;

const TechWindow = styled(Window)``;

const AboutTile = styled(Tile)`
  grid-area: about;
`;

const FeaturedTile = styled(Tile)`
  grid-area: featured;
`;

const SocialTile = styled(Tile)`
  grid-area: social;
`;

const FeaturedWindow = styled(Window)`
  background-color: #d8d8d8;
`;

const AboutWindow = styled(Window)`
  background-color: green;
`;

export default App;
