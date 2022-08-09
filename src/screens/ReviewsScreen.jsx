import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import productActions from '../redux/actions/productActions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';
import reviewsStyles from '../styles/reviewsStyles';

export default function ReviewsScreen({ route, navigation }) {
  const { id } = route.params
  const [ratingProduct, setRatingProduct] = useState(0)
  const [reviewsProduct, setReviewsProduct] = useState([])
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()

  const productRedu = useSelector(store => store.productsReducer.product)
  const rating = useSelector(store => store.productsReducer.rating)
  useEffect(() => {
    dispatch(productActions.getOneProduct(id))
      .then(res => setProduct(res.data.response.product))
  }, [id])

  useEffect(() => {
    if (product) {
      if (product.reviews.length > 0) {
        dispatch(productActions.getRating(product.reviews))
        setRatingProduct(rating)
      }
    }
  }, [product, rating])


  return (
    <>
      {product &&
        <>
          <View style={reviewsStyles.reviewContainer}>
            <Text style={reviewsStyles.nameProductReview}>
              {product.name} Reviews
            </Text>
            <Text style={reviewsStyles.stars}>{ratingProduct} Stars of {product.reviews.length} Reviews</Text>
            <Rating
              type='custom'
              tintColor={'#F2F2F2'}
              readonly
              startingValue={ratingProduct}
              style={reviewsStyles.rating}
            />

            <ScrollView style={{ marginBottom: 85 }}>
              {product?.reviews.map(rev => {
                return (
                  <View style={reviewsStyles.everyReview} key={rev._id}>
                    <View style={reviewsStyles.ratingAndDate}>
                      <View style={reviewsStyles.dateAndName}>
                        <Text>{new Date(rev.date).toDateString()}</Text>
                        <Text>by {rev.userId.firstName}</Text>
                      </View>
                      <Rating
                        type='custom'
                        tintColor={'#F2F2F2'}
                        readonly
                        startingValue={rev.rating}
                        imageSize={25}
                      />
                    </View>
                    <View style={reviewsStyles.reviewDescriptionContainer}>
                      <Image
                        style={reviewsStyles.imgReview}
                        source={{
                          uri: rev.img
                        }}
                      />
                      <View style={reviewsStyles.textReview}>
                        <Text style={reviewsStyles.textTitleReview}>{rev.titleReview}</Text>
                        <Text>{rev.review}</Text>
                      </View>
                    </View>
                  </View>
                )
              }
              )}
            </ScrollView>


          </View>
        </>
      }

    </>

  )
}