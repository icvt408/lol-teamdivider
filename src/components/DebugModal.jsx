
const DebugModal = ({ onClose, onReplacePlayers }) => {
    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h2>デバッグツール</h2>
                <p>チーム分けのテスト用にダミーデータを追加できます。</p>
                <div>
                    <button onClick={() => onReplacePlayers()}>ダミー</button>
                </div>
                <button onClick={onClose} style={closeButtonStyle}>閉じる</button>
            </div>
        </div>
    );
};

// スタイリング（必要に応じて調整してください）
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '300px',
    textAlign: 'center',
};

const closeButtonStyle = {
    marginTop: '20px',
    padding: '8px 16px',
};

export default DebugModal;