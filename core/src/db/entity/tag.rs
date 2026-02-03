use serde::{Deserialize, Serialize};
use specta::Type;
use utoipa::ToSchema;

use crate::prisma;

///////////////////////////////////////////////
//////////////////// MODELS ///////////////////
///////////////////////////////////////////////

#[derive(Debug, Clone, Serialize, Deserialize, Type, ToSchema)]
pub struct Tag {
	pub id: String,
	/// The name of the tag. ex: "comic"
	pub name: String,
}

pub type TagName = String;

//////////////////////////////////////////////
//////////////////// INPUTS //////////////////
//////////////////////////////////////////////

#[derive(Deserialize, Type, ToSchema)]
pub struct CreateTags {
	pub tags: Vec<String>,
}

///////////////////////////////////////////////
////////////////// CONVERSIONS ////////////////
///////////////////////////////////////////////

impl From<prisma::tag::Data> for Tag {
	fn from(data: prisma::tag::Data) -> Tag {
		Tag {
			id: data.id,
			name: data.name,
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use serde_json::json;

	#[test]
	fn create_tags_accepts_special_names() {
		let payload = json!({ "tags": ["Yaoi", "BL", "+18", "Gore", "Acción"] });
		let parsed: CreateTags = serde_json::from_value(payload).expect("should deserialize CreateTags");
		assert_eq!(parsed.tags.len(), 5);
		assert!(parsed.tags.contains(&"+18".to_string()));
		assert!(parsed.tags.contains(&"Acción".to_string()));
	}
}
