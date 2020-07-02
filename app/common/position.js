export const collision = (a, b) => {
	a = a.getBounds();
	b = b.getBounds();

	return a.x + a.width > b.x
		&& a.x < b.x + b.width
		&& a.y + a.height > b.y
		&& a.y < b.y + b.height;
}

export const center = (obj, wrapper) => {
	obj.position.x = wrapper.width / 2;
	obj.position.y = wrapper.height / 2;

	return obj;
}