package com.MongoController.perigo;

import java.util.List;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.MongoController.perigo.models.Review;
import com.MongoController.perigo.repositories.ReviewRepository;

@RestController
@RequestMapping("/review")
public class ReviewController {
	@Autowired
	private ReviewRepository repository;

	@RequestMapping(value="/", method=RequestMethod.GET)
	public List<Review> getAllReviews() {
		return repository.findAll();
	}

	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public Review getReviewById(@PathVariable("id") ObjectId id) {
		return repository.findBy_id(id);
	}

	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public void modifyReviewById(@PathVariable("id") ObjectId id, @Valid @RequestBody Review review) {
		review.set_id(id);
		repository.save(review);
	}

	@RequestMapping(value="/", method=RequestMethod.POST)
	public Review createReview(@Valid @RequestBody Review review) {
		review.set_id(ObjectId.get());
		repository.save(review);
		return review;
	}

	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public void deleteReview(@PathVariable ObjectId id) {
		repository.delete(repository.findBy_id(id));
	}
}
