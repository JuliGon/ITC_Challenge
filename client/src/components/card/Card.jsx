import "./Card.css";

export default function Card({ id, name, author, image, price }) {
	return (
		<>
			<div className="card text-bg-dark border-secondary mb-3" key={id}>
				<div className="row g-0">
					<div className="col-md-4">
						<img
							src={image}
							className="img-fluid"
							alt="book cover"
							// style={{
							// 	maxWidth: "8rem",
							// 	maxHeight: "12rem",
							// 	height: "100%",
							// }}
						/>
					</div>
					<div className="col-md-8" style={{padding: "0"}}>
						<div className="card-body">
							<h5 className="card-title">{name}</h5>
							<p className="card-text">{author}</p>
							<p className="card-price">
								<big>
									<strong>$ {price}</strong>
								</big>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
