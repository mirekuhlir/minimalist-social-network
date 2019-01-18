import React, { Component } from 'react';
import './LikeButton.scss';
import { addLike, removeLike } from '../../../appState/actions/profileActions';
import { connect } from 'react-redux';

class LikeButton extends Component {
  onLikeClick(profile_id, user_id) {
    if (this.findUserLike(this.props.likes, user_id) === true) {
      this.props.removeLike(profile_id);
    } else {
      this.props.addLike(profile_id);
    }
  }

  findUserLike(likes, user_id) {
    //if user is in likes, change icon that user already gave like
    if (likes.filter(like => like.user === user_id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { user } = this.props.userAuth;

    const icon = this.findUserLike(this.props.likes, user.id)
      ? 'fas fa-thumbs-up like-button--user-liked'
      : 'fas fa-thumbs-up';

    return (
      <button
        className="like-button"
        onClick={this.onLikeClick.bind(this, this.props.profile_id, user.id)}
        //there were a problem with rerendering Font Awesome icon, changing the key solved it
        //changing the key unmout and mount again element into dom
        type="button"
      >
        {' '}
        <span key={icon}>
          <i className={icon} />
        </span>
        {this.props.likes.length}
      </button>
    );
  }
}

const mapStateToProps = state => ({
  userAuth: state.userAuth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike }
)(LikeButton);
