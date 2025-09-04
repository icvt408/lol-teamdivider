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
        <div className={`fixed z-1 size-full bg-black/40 flex top-0 left-0 items-center`} onClick={onClose}>
            <div className={`m-auto bg-bg p-4 rounded-lg`} onClick={(e) => e.stopPropagation()}>
                <h2>{player.riotId}のランク設定</h2>

                <div className="flex p-2 gap-2">
                    {tiers.map(tier => <Button
                        content={<img src={tierIcons[tier]} alt="" />}
                        key={tier}
                        isActive={selectedTier === tier}
                        onClick={() => handleTierButtonClick(tier)}
                    />
                    )}
                </div>
                <div className="flex p-2 gap-2">
                    {divisions.map(division => <Button
                        content={division}
                        key={division}
                        isActive={selectedDivision === division}
                        onClick={() => handleDivisionButtonClick(division)}
                        disabled={isDivisionButtonDisabled}
                    />)}
                </div>

                <div className="flex p-2 gap-2">
                    <Button content="キャンセル" onClick={onClose} />
                    <Button content="確定" onClick={handleSave} disabled={isSaveButtonDisabled} />
                </div>
            </div>
        </div >
    )
}

export default RankModal