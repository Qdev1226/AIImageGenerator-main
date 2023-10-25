import './sessionItem.scss';

const TextSessionItem = (props) => {
    const { options, onclick } = props;

    return <>
        <div className="sesstion-list">
            <button onClick={e => onclick(-1)}>New Chat</button>
            <br/>
            {
                options?.map((option, key) => (
                    <div key={key}>
                        <button 
                            onClick={e => onclick(key)}>
                            {option.subject_title}
                        </button>
                        <br/>
                    </div>
                ))
            }
        </div>

    </>;
}

export default TextSessionItem;