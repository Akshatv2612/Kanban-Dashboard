import React from 'react';
import Icon from './Icon';
import './DisplayButton.css';

// Define the DisplayButton functional component
const DisplayButton = ({
  grouping,
  setGrouping,
  sorting,
  setSorting,
  handleDisplayClick,
  displayOptionsVisible,
  displayOptionsRef,
}) => {
  return (
    <div className="controls">
      {/* Display Button with an icon and text */}
      <button onClick={handleDisplayClick} className='display-button'>
        <Icon name="Slider" width={20} height={20}/>
        <div>Display</div>
        <Icon
          className={`arrow ${displayOptionsVisible ? 'rotate-90' : ''}`}
          name="Arrow"
          width={17}
          height={17}
        />
      </button>

      {displayOptionsVisible && (
        <div ref={displayOptionsRef} className="display-options">
          <div className='inline'>
            <label>Grouping</label>
            {/* Dropdown for selecting grouping criteria */}
            <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className='inline'>
            <label>Ordering</label>
            {/* Dropdown for selecting sorting criteria */}
            <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the DisplayButton component
export default DisplayButton;
