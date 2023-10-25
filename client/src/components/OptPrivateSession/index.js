import { Link } from 'react-router-dom';

const OptPrivateSession = (props) => {
    return <>
        <fieldset className="create-fieldset"><label>Private Session</label>
            <p>Images will only be visible to you until you're ready to share them.
                <span> Buy a
                    <Link
                        to="https://playgroundai.com/pricing"
                        style={{ color: 'rgb(118, 173, 255)' }}>Pro plan</Link> to persist this setting across sessions.
                </span>
            </p>
            <div className="flex gap-x-3 w-44 items-center">
                <label className="chakra-switch [&>span]:bg-[#39324E] [&>span[data-checked]]:bg-[#76ADFF] [&>span]:p-1 css-ghot30">
                    <input className="chakra-switch__input" type="checkbox" defaultValue style={{ border: '0px', clip: 'rect(0px, 0px, 0px, 0px)', height: '1px', width: '1px', margin: '-1px', padding: '0px', overflow: 'hidden', whiteSpace: 'nowrap', position: 'absolute' }} />
                    <span aria-hidden="true" className="chakra-switch__track css-j1l0qk">
                        <span className="chakra-switch__thumb css-7roig" /></span>
                </label>
            </div>
        </fieldset>
    </>
}

export default OptPrivateSession;