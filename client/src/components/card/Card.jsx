import "./Card.css";

export default function Card({ name, author, image, price }) {
	return (
		<>
			<div className="card text-bg-dark border-secondary mb-3">
				<div className="row g-0">
					<div className="col-md-4">
						<img
							src={image}
							className="img-fluid rounded-start"
							alt="book cover"
							style={{
								maxWidth: "7.5rem",
								maxHeight: "12rem",
								height: "100%",
								marginRight: "5px"
							}}
						/>
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h5 className="card-title">{name}</h5>
							<p className="card-text text-secondary">{author}</p>
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
