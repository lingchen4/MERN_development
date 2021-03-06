import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |
      <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>
        delete
      </a>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then(res => {
        this.setState({ exercises: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  deleteExercise(_id) {
    axios
      .delete("http://localhost:5000/exercises/" + _id)
      .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== _id)
    });
  }

  exerciseList() {
    return this.state.exercises.map(el => {
      return (
        <Exercise
          exercise={el}
          deleteExercise={this.deleteExercise}
          key={el.id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercise</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Descirption</th>
              <th>Duration</th>
              <th>Date</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
