const KnowledgeBase = () => (
  <div className="p-8">
    <h1 className="text-4xl font-bold mb-12">Ayurvedic Basics</h1>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="card">
        <h3>Vata Imbalance</h3>
        <ul className="mt-4 space-y-2">
          <li>• Dry skin, anxiety, constipation [web:11][web:16]</li>
        </ul>
      </div>
      <div className="card">
        <h3>Pitta Imbalance</h3>
        <ul className="mt-4 space-y-2">
          <li>• Acidity, anger, inflammation [web:6]</li>
        </ul>
      </div>
      <div className="card">
        <h3>Kapha Imbalance</h3>
        <ul className="mt-4 space-y-2">
          <li>• Weight gain, lethargy, cough [web:16]</li>
        </ul>
      </div>
    </div>
  </div>
);

export default KnowledgeBase;
