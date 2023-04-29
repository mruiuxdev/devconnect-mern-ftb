import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Calendar, MessageCircle, ThumbsDown, ThumbsUp } from "react-feather";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PostItem = ({
    auth,
    post: { _id, name, avatar, likes, comments, createdAt, content, user },
}) => {
    console.log(createdAt);
    return (
        <Card className="rounded shadow h-100">
            <Card.Body>
                <Link
                    to={`post/${_id}`}
                    className="d-block text-third text-decoration-none"
                >
                    {content.substring(0, 100) + "..."}
                    <div className="d-flex align-items-center mt-2">
                        <img
                            src={avatar}
                            width={30}
                            height={30}
                            alt={name}
                            className="rounded-pill me-2"
                        />
                        <small>{name}</small>
                        <i>
                            <small className="d-flex align-items-center ms-2">
                                <Calendar
                                    width={15}
                                    height={15}
                                    className="me-2"
                                />{" "}
                                <Moment format="MMM D">{createdAt}</Moment>
                            </small>
                        </i>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                        <div className="rounded-pill py-1 px-3 bg-light text-secondary d-flex align-items-center me-2">
                            <ThumbsUp className="me-2" width={14} height={14} />
                            <small>{likes.length}</small>
                        </div>
                        <div className="rounded-pill py-2 px-3 bg-light text-secondary d-flex align-items-center me-2">
                            <ThumbsDown width={15} height={15} />
                        </div>
                        <div className="rounded-pill py-1 px-3 bg-light text-secondary d-flex align-items-center">
                            <MessageCircle
                                className="me-2"
                                width={15}
                                height={15}
                            />
                            <small>{comments.length}</small>
                        </div>
                    </div>
                </Link>
                {!auth.loading && auth.user._id === user && (
                    <Button className=" btn btn-danger rounded-pill py-2 w-100 mt-3">
                        <small>Delete</small>
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
