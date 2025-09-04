import { useState } from 'react';
import { tierIcons } from '../types';
import Button from './Button';
const tiers = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond", "Master", "GrandMaster", "Challenger"];
const divisions = ["IV", "III", "II", "I"]

const RankModal = ({ player, onClose, onSave }) => {
    const [selectedTier, setSelectedTier] = useState(player.rank.tier)
    const [selectedDivision, setSelectedDivision] = useState(player.rank.division)

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
        setIsSaveButtonDisabled(false)
        setSelectedDivision(division)
    }

    const handleSave = () => {
        onSave(player.riotId, { tier: selectedTier, division: selectedDivision });
        onClose();
    };

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <h2>{player.name}のランク設定</h2>

                <div className='tier-select'>
                    {tiers.map(tier => <Button
                        content={<img src={tierIcons[tier]} alt="" />}
                        key={tier}
                        isActive={selectedTier === tier}
                        onClick={() => handleTierButtonClick(tier)}
                    />
                    )}
                </div>
                <div className='division-select'>
                    {divisions.map(division => <Button
                        content={division}
                        key={division}
                        isActive={selectedDivision === division}
                        onClick={() => handleDivisionButtonClick(division)}
                        disabled={isDivisionButtonDisabled}
                    />)}
                </div>

                <div className='modal-buttons'>
                    <Button content="キャンセル" onClick={onClose} />
                    <Button content="確定" onClick={handleSave} disabled={isSaveButtonDisabled} />
                </div>
            </div>
        </div >
    )
}

export default RankModal