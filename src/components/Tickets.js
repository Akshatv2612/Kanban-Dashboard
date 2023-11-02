import './Tickets.css'
import UserIcon from './UserIcon';
import Icon from './Icon';
import { priorityMap } from '../assets/List/priorityMap';

// Define the Ticket functional component
const Ticket = (props) => {
    const { users } = props;
    const { grouping } = props;

    // Function to find a user by their ID
    const findUserById = (userId) => {
        return users.find((user) => user.id === userId);
    };

    const user = findUserById(props.userId);

    let userIcon = null;

    // Show the user icon only if not grouped by 'user'
    if (grouping !== 'user') {
        userIcon = <UserIcon name={user.name} width={19} height={19} available={user.available}/>
    }

    let statusIcon = null;

    // Show the status icon only if not grouped by 'status'
    if (grouping !== 'status') {
        statusIcon = <Icon name={props.status} width={17} height={17} />
    }

    let priorityIcon = null;

    // Show the priority icon only if not grouped by 'priority'
    if (grouping !== 'priority') {
        priorityIcon = (
            <div className='priority-icon'>
                <Icon name={priorityMap[props.priority]} width={17} height={17} />
            </div>
        );
    }

    return (
        <div key={props.id} className="ticket">
            <div className='title-icon'>
                <div className="ticket-id">{props.id}</div>
                {userIcon}
            </div>
            <div className='ticket-title-div'>
                <div className='ticket-status-icon'>{statusIcon}</div>
                <div className="ticket-title">
                    {props.title.length > 60 ? `${props.title.slice(0, 50)}...` : props.title}
                </div>
            </div>
            <div className='card-last-element'>
                {priorityIcon}
                <div className='ticket-tag-container'>
                    <div><Icon name="GreyCircle" width={10} height={10} /></div>
                    <div className="ticket-tag">{props.tag}</div>
                </div>
            </div>
        </div>
    );
}

// Export the Ticket component
export default Ticket;
