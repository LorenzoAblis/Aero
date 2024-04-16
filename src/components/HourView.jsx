import PropTypes from "prop-types";

import "../styles/HourView.scss";

const HourView = ({ showHourView, selectedHour }) => {
  return (
    <aside className={`hour-aside ${showHourView ? "show-menu" : "hide-menu"}`}>
      <div className="apple">{selectedHour.time}</div>
    </aside>
  );
};

HourView.propTypes = {
  showHourView: PropTypes.bool.isRequired,
  selectedHour: PropTypes.object.isRequired,
};

export default HourView;
