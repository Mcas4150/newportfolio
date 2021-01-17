import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { bindActionCreators } from "redux";
import ReleaseListItem from "./release_list_item";
import {
  fetchCollectionNextPage,
  fetchUserCollection,
} from "../../actions/collectionActions";
import SearchBar from "./search_bar";
import styled from "@emotion/styled";

class ReleasesList extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false };
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserCollection(50);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      _.has(this.props.collection, "pagination")
    ) {
      const { pagination } = this.props.collection;

      if (_.has(pagination.urls, "next") && !this.state.isLoading) {
        this.props.fetchCollectionNextPage(pagination.urls.next).then(() => {
          this.setState({ isLoading: false });
        });
        this.setState({ isLoading: true });
      }
    }
  }

  render() {
    const { releases } = this.props.collection;

    if (_.isArray(releases) && !_.isEmpty(releases)) {
      return (
        <div>
          <SearchBar />
          <ReleasesContainer>
            {releases.map((release) => {
              const data = release.basic_information;

              return (
                <div key={data.id} className="col-auto p-0">
                  <ReleaseListItem data={data} />
                </div>
              );
            })}
          </ReleasesContainer>
        </div>
      );
    }

    return null;
  }
}

const ReleasesContainer = styled.div`
  justify-content: center;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}
`;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchCollectionNextPage, fetchUserCollection },
    dispatch
  );
}

function mapStateToProps(state) {
  return { collection: state.collection };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleasesList);