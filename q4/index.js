var nestedObject = {
	data: {
		info: {
			stuff: {
				thing: {
					moreStuff: {
						magicNumber: 44,
						something: "foo2",
					},
				},
			},
		},
	},
};

function contains(obj, value) {
	for (let key in obj) {
		if (obj[key] === value) {
			return true;
		} else if (typeof obj[key] === "object" && obj[key] !== null) {
			if (contains(obj[key], value)) {
				return true;
			}
		}
	}
	return false;
}

let hasIT = contains(nestedObject, 44);
let doesntHaveIt = contains(nestedObject, "foo");

console.log({ hasIT, doesntHaveIt });
