import PropTypes from "prop-types";

// import * as weatherIcons from "../assets/weatherIcons";
// import { ConditionCard } from "./Current";
import "../styles/DayView.scss";

const DayView = ({
  data,
  showDayView,
  setSelectedDay,
  selectedDay,
  settings,
}) => {
  return (
    <aside className={`day-aside ${showDayView ? "show-menu" : "hide-menu"}`}>
      <div className="day-card">{selectedDay.day}</div>
    </aside>
  );
};

DayView.propTypes = {
  data: PropTypes.array.isRequired,
  showDayView: PropTypes.bool.isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  selectedDay: PropTypes.object,
  settings: PropTypes.object.isRequired,
};

export default DayView;
