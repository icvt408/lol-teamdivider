import { useState } from 'react';
import { tierIcons } from '../types';
import "./RankModal.css";
const tiers = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond", "Master", "GrandMaster", "Challenger"];
const divisions = ["IV", "III", "II", "I"]

const RankModal = ({ player, onClose, onSave }) => {
    const [selectedTier, setSelectedTier] = useState(player.tier)
    const [selectedDivision, setSelectedDivision] = useState(player.division)

    const [isDivisionButtonDisabled, setIsDivisionButtonDisabled] = useState(true)
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true)

    const handleTierButtonClick = (tier) => {
        if (!["Master", "GrandMaster", "Challenger"].includes(tier)) {
            setIsDivisionButtonDisabled(false);
            setSelectedDivision(null);
            setIsSaveButtonDisabled(true);

        } else {
            setSelectedDivision("I")
            setIsDivisionButtonDisabled(true);
            setIsSaveButtonDisabled(false);
        }

        setSelectedTier(tier)

    }

    const handleDivisionButtonClick = (division) => {
        console.log(division)
        setIsSaveButtonDisabled(false)
        setSelectedDivision(division)
    }

    const handleSave = () => {
        onSave(player.name, { tier: selectedTier, division: selectedDivision });
        onClose();
    };

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <h2>{player.name}のランク設定</h2>

                <div className='tier-select'>
                    {tiers.map(tier => <button
                        key={tier}
                        className={`rank-button ${tier}
                        ${selectedTier === tier ? 'selected' : ''}`}
                        onClick={() => handleTierButtonClick(tier)} >
                        <img src={tierIcons[tier]} alt="" />
                    </button>)}
                </div>
                <div className='division-select'>
                    {divisions.map(division => <button
                        key={division}
                        className={`rank-button ${division} 
                        ${selectedDivision === division ? 'selected' : ''}`
                        }
                        onClick={() => handleDivisionButtonClick(division)}
                        disabled={isDivisionButtonDisabled}>{division}</button>)}
                </div>

                <div className='modal-buttons'>
                    <button onClick={onClose}>キャンセル</button>
                    <button onClick={handleSave} disabled={isSaveButtonDisabled}>確定</button>
                </div>
            </div>
        </div >
    )
}

export default RankModal