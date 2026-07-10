export function PalettePreview() {
  return (
    <div className="palette-preview">
      <div className="card" style={{ maxWidth: '220px' }}>
        <h3>sample card</h3>
        <p>this is what a top 10 card looks like with the current palette.</p>
      </div>
      <ol className="ranked-list" style={{ margin: 0, minWidth: '220px' }}>
        <li className="ranked-item">
          <span className="rank">1</span>
          <div>
            <p className="title">ranked item</p>
            <p className="note">a little note about it</p>
          </div>
        </li>
      </ol>
      <button type="button" className="admin-btn primary">
        accent button
      </button>
      <button type="button" className="admin-btn danger">
        highlight button
      </button>
    </div>
  );
}
