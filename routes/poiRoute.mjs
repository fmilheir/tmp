import express from 'express';
const router = express.Router();
import PointsOfInterestController from '../Controllers/poiControl.mjs';


router.get('/pointsOfInterest', PointsOfInterestController.getAllPointsOfInterestController);

router.get('/pointsOfInterestByRegion/:region', PointsOfInterestController.getPointOfInterestByRegionController);

//router.post('/pointsOfInterest/:name/:type/:country/:region/:lon/:lat/:description', PointsOfInterestController.addPointOfInterestController);

router.post('/pointsOfInterest', PointsOfInterestController.addPointOfInterestController);

router.delete('/pointsOfInterest/:id', PointsOfInterestController.deletePointOfInterestController);

router.get('/pointsOfInterest/recommendations/:recommendations', PointsOfInterestController.getPointsOfInterestByRecommendationsController);

router.get('/pointsOfInterest/:id', PointsOfInterestController.getPointOfInterestByIdController);

router.post('/recommend/:id', PointsOfInterestController.addRecomendationToPoi);


//////////////// Swagger Annotations
//// Schema:
/**
 * @swagger
 * components:
 *  schemas:
 *      PiointOfInterest:
 *          type: object
 *          required:
 *              - name
 *              - type
 *              - country
 *              - region
 *              - lon
 *              - lat
 *              - description
 *              - recommendations
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the Point of Interest.
 *              type:
 *                  type: string
 *                  description: The type of the Point of Interest.
 *              country:
 *                  type: string
 *                  description: The country where the Point of Interest is.
 *              region:
 *                  type: string
 *                  description: The region where the Point of Interest is.
 *              lon:
 *                  type: decimal
 *                  description: The longitude of the Point of Interest.
 *              lat:
 *                  type: decimal
 *                  description: The latitude of the Point of Interest.
 *              description:
 *                  type: string
 *                  description: The description of the Point of Interest.
 *              recommendations:
 *                  type: string
 *                  description: The recommendations of the Point of Interest.
 *              image:
 *                  type: string
 *                  description: A limited portion of the image data for preview.
 *          example:
 *              name: testuser
 *              type: testuser
 *              country: testuser
 *              region: testuser
 *              lon: 0.000000
 *              lat: 0.000000
 *              description: testuser
 *              recommendations: testuser
 *              image: 77+977+977+977+9ABBKRklGAAEBAAABAAEAAO+/ve+/vQDvv70ACQYHEhISEBASExYQDxAQDw8PDxASFhAPDxAVERYWFREVFRgdKCAYGiUbFRUhMSEmKSsuLi4XHzM4My03KC0uKwEKCgoOCg4aEBAbLSUdHS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t77+977+9ABEIAO+/vQErAwEiAAIRAQMRAe+/ve+/vQAbAAABBQEBAAAAAAAAAAAAAAAEAQIDBQYAB++/ve+/vQBDEAABAwIBCAYGBwcEAwAAAAABAAIDBBEFBhITITFBUWEUIkJx77+977+9FTJS77+977+977+9BzNicu+/ve+/ve+/vRYjQ1Pvv73vv73xg6Ky77+9FzRz77+977+9ABoBAAIDAQEAAAAAAAAAAAAAAAECAAMEBQbvv73vv70ANREAAQMBBQQHCQEAAwAAAAAAAQACEQMEEiExQRNRYe+/vSIyQnHvv73vv73vv70FFCNS77+977+977+977+977+9YhVT77+977+977+9AAwDAQACEQMRAD8A77+9Nu+/ve+/vW1CPu+/vQPvv70EKN6eMO+/vS7vv73vv73vv73vv71s77+9CO+/vVzvv73vv73vv70GFu+/vSNw77+977+977+9Cu+/vVnvv73vv71w77+9U++/vSxS77+9ITJcPArvv70K77+9MO+/ve+/ve+/vS4u77+9di7vv73vv73vv73vv71Q77+9CnPvv73vv71b77+9eivvv71gbGTvv71mOEHUj++/vSjvv71477+9aXJ077+9Vu+/ve+/vQXvv70qKjnvv73vv70r77+9T2fvv71VbO+/ve+/ve+/ve+/vQrvv73vv70x3rUM77+977+9KRvvv71ySh7vv70wCe+/vTcc77+977+977+977+9d++/vTMj77+977+9Wu+/ve+/vTzvv73vv70K5KGq77+977+9UFMhY++/vTzvv715TW4e87ytqO+/ve+/vS4YXyVrXCMFW++/ve+/ve+/ve+/ve+/ve+/vXlP77+9O++/ve+/vXo777+9cO+/ve+/vStA77+9USAY77+977+9OHPvv73vv73vv73vv73vv70377+977+9GHpww5Tvv73vv73vv73vv73vv71O77+9Unou77+9WnDvv73vv73vv73vv70W77+9KnBZAe+/ve+/vV3vv71LYmgC77+9RBHvv70U77+9Vjvvv71877+924bvv71a77+9UQXvv70JS++/vQrvv71ZQ++/ve+/vV3vv73vv71LUGjvv716Iu+/vUIbQu+/vT7vv73vv73vv705LRnvv71OFO+/ve+/vQpfKzYoeS7vv70877+977+9UQTvv71EEe+/vRLvv70rN++/vVN6FyXvv700YTXUqO+/vQlL77+977+9dD5J77+977+977+977+977+9VO+/vUzvv73Qpe+/vXofJN6I77+977+9Kk7vv73vv73Ut++/vSzvv71i77+977+977+977+977+9ZTTvv73vv73vv73vv71ZSUDvv73vv71U77+977+977+9GCLvv71M77+9Ce+/vRYOChbvv71MeO+/vXoiYu+/vTQHzLTvv73vv73vv70wau+/vWcwcEBO77+977+9YHJyU++/vTDkrJxVZu+/vQ9pXO+/vUVAOu+/vVbvv70bCVZ077+9Ru+/vRZLPG8o77+9cn3vv715Se+/vdSHaTjvv73vv70977+977+9Fg4KQTNU77+9Aypo77+9MhVv77+9TAwK77+977+977+9TiEKJAnvv71A77+9GFXvv73vv70V77+977+977+9Su+/vTcFLmclKyls77+977+9BO+/vVzvv70Q77+977+9Hkpe77+9Fe+/vSFc77+9Vu+/vQJELO+/ve+/vcqrNO+/vTQK77+90Kjvv70K77+977+9Au+/ve+/ve+/vUDvv73vv73vv71u77+9Me+/vRTSlO+/vRBuCkbvv70r77+9N0QI77+9IO+/vQowSgHvv71NIU7vv73vv71j77+9U++/vVnvv70O77+9LGxMLE/vv70Udkg0Yu+/vXgJ77+9CjlkURnvv70BKTjvv70gJe+/vQgzUu+/vdWmQlHvv70BKQrvv73vv73vv73vv73vv70heCsc1I5gQO+/vcKcKu+/vQRhC++/vRYiCe+/ve+/vSjvv71QeCcJCdykKSEu77+9Ju+/vUjGku+/ve+/vSjvv71K77+977+9TU7vv73vv73vv70VbO+/ve+/ve+/ve+/vREncg9r77+9NTrvv73JhWjvv70277+9Uzbvv73vv71o77+977+977+9JXPvv71e77+91qd2FO2BvBI677+9cFDvv73vv73vv70K77+9Ze+/ve+/vUBV77+9OnDvv71YHO+/ve+/vQRJ77+9JdGFSS5RM++/vVEc77+9bxRdRu+/ve+/vSjvv71Mau+/ve+/vQJbKjZjRO+/vR8FPHXvv70pTRfvv73vv71hWe+/ve+/ve+/ve+/vTvvv71RCR5477+977+9c0l077+9Lk/Qp++/ve+/vQzvv71xKQMdxKIHFAnvv73vv70L77+9Q2Y777+9SBjvv70lbG5LK++/vSjvv73vv73vv71zXcSoXyPvv73vv71o77+9Vu+/vWLvv73vv71IQFXvv713c0w1Lkwa77+977+9BWJYE++/vQLvv70VTk81blDvv73vv70eEe+/ve+/vSYYQhBVFO+/vVDvv70KW++/vUhgCV1OFBp1IO+/vQMqCFBJSdyidQ8g77+9dO+/vTpCcSkIahHvv71/IO+/vX4bfe+/vR5qQu+/vRHvv73vv73vv73vv71V77+9KHBJ77+977+9We+/ve+/ve+/ve+/vW85C++/vUEMNHBOGHBT77+977+9GU8Q77+977+9Ie+/vTbvv70FK2jvv71RGu+/vRLvv73vv71U77+9Tu+/vSXvv70A77+977+9CD0j77+9Z++/vQgp77+9JxDvv73vv70nR1EY2ppo77+977+9zaVvBXkA77+977+977+9cDgEbFXvv73vv70XU++/ve+/vQpCRO+/vTcEVG8L77+9Wu+/vTjvv73vv70bQe+/vUPvv70ZXCzvv71lUSZP77+977+977+9cStOJ2pHVQrvv73vv70g77+977+9UO+/vRFN77+9Yu+/ve+/vWTvv73vv71y77+977+9J++/ve+/ve+/vWjvv71W77+977+9Ke+/vWkO77+977+977+9Ku+/ve+/vSLvv70h77+9Uu+/ve+/vQ4BSu+/vVo377+9cyQ77JW077+977+9VUfvv71W77+9ARJLRu+/ve+/vUbvv71RClTvv71OEu+/vVxmbxQ9ZiEcTXTvv704Me+/vRdz77+977+9Ae+/vdyJMTQvHe+/vSxt77+9FTI177+977+9CncY77+9YAc10ovvv71KT33vv73krqNO77+977+977+977+9VCxs77+9e++/vWXvv73vv70l77+977+9Ee+/vWDvv71hd++/vW3vv71377+977+977+9z43vv70uNxVv77+977+9aO+/vQLKmD5Sbe+/ve+/vXgATe+/ve+/vTPvv71kb++/ve+/ve+/vV1g77+9Je+/vV/MnO+/ve+/vTZYYnEQXO+/vTN377+9Ggrvv71bYu+/vVk177+9Me+/vVnvv73vv70p77+977+9TcOP77+9P++/ve+/ve+/vWF1QFzvv73vv70477+977+9Dlk8LhJY77+9CDwO77+977+9Le+/vUrvv73vv70AdF7vv70kPBMd77+977+9VmTvv70977+9ae+/vSdsdSTvv73vv73vv73vv71BBVsa77+9YSzvv71C77+9N++/vU3vv709FGoSae+/vTjvv73vv73vv73vv71J0Z3vv70V77+9K++/ve+/vRxU77+977+977+977+977+9Xjfvv71077+9JnlTFCAo77+9HO+/vTTvv70077+977+977+9Iu+/ve+/ve+/ve+/vWEJ77+9ZO+/vXQxUwXvv70Q77+977+9Al0677+9OEcVOiojCE0x77+977+977+93pvvv71cEwxJ0bLvv71W77+977+9HBFCNUvvv701K1tw77+9Ru+/vWTvv73vv71x3ohtEe+/vRtk77+977+9O++/vUTvv71V77+977+9TR1k77+977+9G8qZ77+977+9CHMqa++/vULvv71fUdqV77+9U++/ve+/vQIwNe+/vS5zVXHvv73vv701R++/vV3vv73vv71p77+977+9GSs9IEhmVe+/vWfvv73Luu+/vXLvv70VNu+/ve+/ve+/ve+/vTDvv70g77+9LynCle+/vVHvv73vv73vv71edu+/vSnvv70XIu+/ve+/vdCQ1ZTeiO+/vU4URTfvv71L77+9FG7vv70lee+/vUxQFnTvv73vv73bntqJWu+/vUgHO++/vXrvv70xRu+/vVjvv71tFVvvv73vv70077+9Ve+/ve+/ve+/vRtd77+9Le+/vWbvv73vv71APVdyLSVq77+9VGtd77+977+977+9Qu+/ve+/vUo077+9CDwnD++/ve+/vWvYuu+/vTfvv71v77+977+977+977+9aO+/vU/vv73vv73vv73vv73vv73vv71S77+9OxDvv73vv70Kdx/dve+/ve+/vR3Oojfvv73vv73vv71GMxHvv70K77+9ANOZ77+9dwkZe3Ea77+9VHYrLe+/ve+/ve+/vT3cle+/ve+/ve+/ve+/ve+/ve+/vUnvv73vv73vv71t77+9AE3vv73vv73FqVxp77+9D++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vTfvv73vv71v3Kjvv70877+977+977+9Ml/dne+/vRgLbcuve++/vXxbKmfvv73vv73vv71z77+977+9Ee+/ve+/vRkI77+9AF9277+9au+/vT4M77+9JwxV77+977+93qkgHO+/vThH77+977+9Ve+/ve+/ve+/vQDvv73vv73Tqe+/ve+/ve+/ve+/ve+/vUvvv714WW1zFhvvv70377+9VUjvv71777+9HHccWgvvv73vv73vv73vv73vv73vv71ZV0Rg77+977+9S++/ve+/ve+/vVIWFSVE77+9JE/vv70pM0rvv70mXXFydmLvv73vv71U77+9GXJheu+/vTE3Ru+/vVgqHO+/ve+/ve+/vWzvv73vv700Iu+/vRUYK++/ve+/vUhK77+9Ju+/vSgJLu+/ve+/vRBS77+977+9Hu+/vSUl1IUlE++/vU7vv70EHe+/vXPvv73vv70vFXIa77+9RO+/vW17Ru+/ve+/vSQ3N+Cwuu+/vVRo77+977+977+9Rdql77+977+9d0VN77+977+977+9PyTvv71ZHu+/vXXvv70g77+9NO+/vQoW77+91aJx77+9N0cc77+977+9RyTvv73vv73vv71j77+9M++/vR8V77+9PkB7xJ/vv73vv73vv70g77+9VwAOSkMSTO+/vQTvv70D77+977+9fe+/vUla1o1XPml277+977+977+977+977+977+9aSVC77+9Gj/Khe+/ve+/vRvvv73vv71tR2TUjnsb77+9Re+/vR4p77+977+977+9LsS5BQvvv71O77+9eO+/vVjvv709eCoK77+977+91Ktg77+9aDxjDu+/ve+/vTzHtDxc2a7vv70HUQQSNxB/VkEcWO+/vVHvv71c77+9Ku+/vVnvv700zIlU77+977+9Te+/ve+/vQwVT++/vVbvv71e77+9S++/ve+/vTfvv70p77+977+977+9HxNF77+9Ae+/vW1pNiNu77+977+9b++/ve+/ve+/ve+/vUU077+9a++/vXN677+9RhBsQRpAdXjvv70eJU0c77+9Mnvvv73vv70jIO+/vVbvv73GvHbvv70vC++/vXrvv71s77+9SU/vv70hB++/vU7vv717c++/ve+/vWXvv71+bu+/vXZa77+9Gu+/vS11AXNwWSgQ77+9Qe+/vTPvv71/77+977+977+977+977+9eAPvv70Wc++/ve+/ve+/ve+/ve+/ve+/vQc677+9Be+/ve+/vdyY77+977+977+9SO+/vUcSGQQ677+9S++/vUdV77+977+9C++/vQcdyLnvv73vv71X77+9Ngo5Gu+/vQBu77+9zIo277+977+977+977+977+9QHTvv73vv73vv71677+9BO+/ve+/vREYbu+/vWEHaO+/ve+/ve+/ve+/veOvuVNlNVgg77+9AO+/vSPvv73vv73vv73vv73vv70PdO+/vUjvv73vv705fu+/vXfvv73vv704W2kgbFteS++/ve+/ve+/vWzvv703d++/ve+/vQcgFe+/ve+/vX7vv73vv73vv73vv71iB++/vXjvv70vTu+/ve+/ve+/vT9Bdu+/vSrvv71Ic04V77+9SEcUfu+/vSTShCDvv73vv70PJO+/vVHsj5Lvv73vv73vv70h25Hvv73vv70L77+9RcOBHe+/vTdIPe+/vTvvv70l77+9W++/vWEKEO+/vQDvv71/BO+/ve+/ve+/vQHvv71FCVIW77+977+977+9Qte+77+9DgRw77+9KO+/vVPvv71b77+9UjLvv71octK5E++/vQUx77+9CO+/vRdUF00uSu+/vXNRSElPL0he77+9IO+/ve+/vRTQku+/vVLvv73vv73vv71pOS7vv70OCkIX77+9GtmH77+9He+/vRfvv73vv73vv70fS++/vXXvv73Yme+/vXXvv73vv73vv71V77+977+977+9D++/ve+/ve+/ve+/vVkd77+9VG3vv71O77+9Y++/vU3vv70vdAA1P++/ve+/ve+/ve+/vSHvv70uM++/ve+/ve+/vQkpMO+/ve+/vVnvv71077+9eO+/vX4K77+9MO+/vcWY77+977+977+9QCfvv70jXgDvv70W77+9a++/vW5B77+9L23vv73vv73ave+/ve+/vUvutJvvv70M77+9eu+/vS3vv73vv73vv73vv70C77+977+9M++/ve+/vRPvv73vv71I77+9Agp5C0Zx77+977+977+9UA/vv70nXu+/vStV77+977+977+9CXHvv73vv71XaO+/vTXvv700Su+/ve+/ve+/vQQc2I3vv71877+9Eu+/vQ5k77+9aO+/vSM62a3vv711DzLvv73MslNmJ+q5j++/vVVx77+977+9Uk1eTx8A77+9fVPvv70fOybvv73vv73vv71/77+977+977+9Y++/vU7vv70BaAAM77+9Yu+/vXMr77+977+977+9V1zvv73vv73vv73vv73vv73vv70477+977+977+9AO+/vTwv77+9RRBUIB4J77+977+9XTDvv73vv70777+9Se+/ve+/vTt+Vu+/vRBPCRoPJO+/vSvvv70hH++/vQ/vv71NFe+/ve+/ve+/vT4k77+9KO+/vUpL77+9QTTvv71477+977+9Wcye77+9W++/vTDvv70lLhvvv71r77+977+9FEHvv73vv71+Ce+/vUnvv73goJbvv70m77+977+9Xu+/vW/vv73vv70a77+977+9Xe+/vXDvv70HO++/vVLvv704JgY377+9LycD77+977+977+9TUPvv73vv708Whc977+9ZO+/vQLvv73vv71x77+977+9MB3vv70S77+93olmIe+/ve+/ve+/vW5v77+9FMq+LD7rrrNm77+977+9Xu+/vcSrShBf77+977+977+9a0le77+9Y2Tvv73vv71V2roC77+9bVDvv707wpNJfe+/vUzvv73vv73vv71r77+9CEVd77+9AAXvv71f77+977+9Ou+/vQcD77+9dQUsMUHvv70+Fwfvv70sLXdq77+977+9cS8EatW5BO+/vX/vv73vv73vv73vv71eBGMjMHML77+9aGXvv70I77+9O++/vVBU77+9O1Hvv73vv706Ke+/vTfvv710aRrvv73vv73vv73vv73vv707aB3vv73Suj9l77+9B++/vUHvv73vv73XuSvvv71aFFJ377+9HSEbdXfvv73vv71SZx/vv73vv70Y77+9Nl0u77+977+9WO+/ve+/vcOyUe+/vSUVcO+/vW5ocVXvv70LHiDvv71P77+977+977+9GggHW2/vv73vv71lIQkKUu+/ve+/vRoORu+/vTZ177+9Iu+/ve+/vRJwKO+/vRIV77+92JAX77+977+9LhPvv70GXe+/ve+/ve+/vWxy77+977+9Ku+/ve+/vVbvv73vv71ade+/ve+/vW7vv73vv71cSz3vv73vv70q77+977+9TiNNO++/ve+/ve+/vR1r77+9A2hY77+9PFpI77+9A3Z7J13vv73vv73vv70WMu+/vVs6Jzfvv71YXkbvv73vv71F77+977+977+9QQMiCAfvv73vv71K77+9Vk9rUO+/ve+/ve+/vRDvv73vv70j77+9w5wjX0Zd77+977+977+9Ou+/vWhK77+9Iu+/ve+/ve+/ve+/vW3vv70WKO+/ve+/ve+/vRBz77+9SO+/vW7vv73vv70H77+977+9F++/ve+/vRrvv71y77+977+9H3bvv70AK++/ve+/ve+/vSpT77+977+9Ie+/ve+/ve+/ve+/vR5c1orvv71WVO+/vXV0Y++/vUVdHRbvv70D77+977+977+9eu+/vVXvv73vv71n77+9WDYa77+9LjUPFe+/vRNYAgE277+977+9de+/vRDvv73vv71x77+977+977+9Ou+/ve+/vV1aNu+/vX7vv715HO+/vSPvv73vv73vv71z77+9WQll1p7vv73vv73vv73vv71R77+977+9ee+/ve+/vUNHCu+/ve+/vTDvv70177+9c++/ve+/vTXvv73vv71FYe+/vXMB77+9eS5277+9LHvvv73Ciu+/ve+/vRd1de+/vTbvv71bbe+/vQrvv71q77+91L5g77+977+91bh+SRxkDu+/vW3vv73vv71N77+9EgXvv73vv71j77+9B1gA77+9WdqaRu+/ve+/vWHvv73vv73vv73vv71b77+9LO+/vTTvv71q77+9LO+/vR3vv70X77+977+9Ae+/ve+/vWgKPe+/ve+/vQB7Ku+/vUJCTmnvv73vv73vv71zb++/ve+/vWjvv70077+9cBdM77+9JO+/ve+/vVjvv73JkRwAA++/vRV877+9Ywrvv73vv73vv70d77+9QgkeK++/vVHvv73vv718Gu+/vQBl77+977+977+9Hkfvv73vv73vv71lybDvv71O77+977+9bO+/ve+/vSZ8B++/vWVta++/ve+/vRzPmU3vv70777+9e++/ve+/vQUjYu+/ve+/vXhIR++/vXYrC3tg77+977+9Xe+/vRrvv70f77+9Ce+/ve+/vdG477+977+9cWZpADhbee+/vUrvv70A77+9XMaXYhbvv73vv71977+977+9K++/vR5AR2Dvv73vv73vv73vv73vv71R77+9Xl9v77+977+977+9WVBjQO+/vWTvv73vv71v77+9e++/vSUF77+9BEtcMVY0de+/vW3vv73vv73vv73vv71Oc++/vUtQ77+9WSwI77+977+977+9BUHvv70jJADvv73vv712AO+/vUlV77+977+9ZlkYxovvv73vv70234nvv73vv71r77+9Wu+/vQ/vv73vv73vv73vv73vv73FoO+/ve+/ve+/ve+/ve+/vVXvv70fee+/ve+/vRRM77+9Uwrvv70fdzgUPR4U77+9ODHvv73vv73vv73Rnu+/vX4277+977+9Cn/vv73vv73vv70ibu+/vSZ177+977+9WuOWsCxWSu+/vUnim4h877+9AO+/vSAdScW/UGMYWizvv73vv70w77+9NO+/vT/vv70gxpnvv73vv71E77+9KzHvv73vv71x77+9QBxaFDk/77+9OdKWPu+/vRnvv71e77+9bgtUaUnvv71cD++/vSfvv73vv73vv73vv71bbu+/vW4777+977+9AAtlN++/vSfvv73vv73vv73vv71y77+9Xu+/ve+/vTYf77+9eu+/vd+nHxTvv73TgAsv77+977+9YcSdW1dFQjPvv73OpwpDXc+PAO+/ve+/ve+/vTBt77+977+9e++/vSo977+977+977+9XGvvv71x27A0Kh1MEu+/ve+/ve+/vTMR77+9dO+/ve+/ve+/ve+/ve+/vWrvv71k77+9MO+/vUkb77+9Hu+/ve+/vUjvv706d++/vTrvv703Wd+5CiRb77+977+9OWVpIO+/ve+/vTgoZQo6yL8h77+9J++/vdutE++/ve+/ve+/vUo1Cu+/vWMB77+9KndGeC4U77+9We+/vTMAJe+/vQzXqBcHEjjvv71CVWPvv73vv73vv73vv715bFdJVBbvv73vv71B77+9xZoVJUvvv73vv73vv73vv71177+9ZO+/ve+/vWrvv70FU++/vUvvv73vv70577+9Q0ky77+977+977+977+9zabvv73WjkhE77+9Fu+/vTrbixFw77+9Ou+/vQ/vv712c3fvv704Bzfvv70Qfh4rGO+/vW5XfVx677+977+977+9QzBVNe+/vUbvv73vv73vv71gVO+/vQ5A77+9di7vv71IHe+/vXp1PVvvv73vv70t77+977+9Ce+/vTUT77+9B++/ve+/vQB177+977+9Wu+/vXVn77+977+977+9Gu+/vWxV77+9eO+/vS4B77+977+9DxQBaUHCo3MffyQ877+977+9OO+/ve+/vRxm77+9aO+/vS0n77+9A08y77+9GRUp77+9ZAVX77+9ACHvv70rT++/ve+/vQDvv70U77+977+9dsKtY++/vSQDUQViH++/vVXvv73vv71IPjZNGFYg3Zfvv71yd1po77+9EVHvv73vv70q77+977+977+977+977+90aseMe+/ve+/vRR277+9B++/ve+/ve+/vSlz77+977+9B++/ve+/vSsMxJvvv71x77+9BRUWPe+/vce2A++/vXjvv71f4Lm277+9Flfvv73vv70D77+9PyF0bF7vv73vv73vv71q77+977+9f++/vVYOcO+/vV0977+977+9HiDvv70tGXtS77+9XhI977+9ERDvv70k77+977+9ZHjvv70Q77+977+9G++/ve+/ve+/ve+/vdGo77+9V++/vWc077+977+977+9PxHvv70/Q3FgGu+/ve+/ve+/ve+/ve+/vT/vv73vv70mCu+/ve+/ve+/vXVnT++/ve+/vU3vv71777+977+9K++/vUwT77+9Ku+/vXPvv73vv71O77+977+9Dm/vv70p77+9GG8u77+977+9cu+/ve+/ve+/vR7vv73vv73vv73vv70KUe+/vdSne3zvv71nQO+/vVsd77+977+9HC8IJ++/vRU2Ewvvv71z77+9W++/vWlp77+9CExPJ2Lvv70B77+9cy3vv73vv73vv71477+9Qu+/ve+/vWVIe0Pvv73vv70S77+9KCQA77+9W++/vWbvv73vv71K77+977+977+9FSob77+977+977+977+9CwV7PSYC77+977+977+9H++/vUpyKe+/ve+/vVvvv73vv70A77+9CgZBFu+/ve+/ve+/ve+/vV9rdG3vv73vv73vv71i77+977+9Lu+/ve+/ve+/vSbvv73vv71z77+9F1Hvv73vv73vv73Hqsi9666G77+977+977+977+977+9KlMdWe+/vX7vv70M3IY377+977+977+9ce+/ve+/vVN+77+977+9PhEP77+9I92O77+9Ne+/ve+/vUIv77+977+977+977+977+9B++/vTVN77+977+9ICAL77+977+9W++/vVLvv71dUEsE77+977+977+9U++/ve+/vSo6CVE3ImPvv70m77+9Q2sQBGBrG++/ve+/ve+/vXwp77+9Ie+/ve+/vXPvv71ibBvvv70377+9Le+/ve+/vVR4dl4JCWvbo++/ve+/vde7D++/vSJc77+977+977+977+977+9Igvvv71FFwYcxK0bW2vvv71J77+977+977+977+9S++/ve+/ve+/vRtuWwfvv71kJ++/vSZ/MHnvv73vv73vv73vv71v77+9PO+/vSBqU++/ve+/vS9CLzvvv70eN++/ve+/vQvvv70YPWfvv73vv73vv70A77+977+977+977+977+9bxJVZO+/vU5Oy6EK3pvvv70dF++/vcmM77+977+977+977+977+977+9U2U0Q2Xvv73vv70vJO+/vRrvv73vv73vv70x77+977+977+977+9Pe+/vV9oR2Lvv706fO+/vQNgA++/ve+/vVXvv73vv71ZP8S3cu+/vVPvv711cu+/vWPvv73vv70pfu+/ve+/vRw677+9Cu+/vUNsNApsPmLvv73vv73vv70W77+977+9LkFL77+9Cu+/ve+/vVbvv73vv70+Y37vv71277+9P++/vWsO77+916jvv70gUe+/vTzvv70S3aIzcu+/vc2UHAXvv71SYu+/vWDvv73vv73vv70x77+9PHtD77+95o+m77+977+977+977+9X++/vX5q77+977+977+9NyYT77+9XU3vv71z77+977+9FeextmlN77+977+9RO+/ve+/ve+/vSkO77+9E++/ve+/vQrvv73vv70277+977+977+977+977+9Vu+/vWVv77+977+977+9ee+/vRQj77+977+977+977+9LCfvv701GmHvv70T77+977+977+9Cz0377+977+977+9cAF5HDhM77+977+9ZHgiH0pYOu+/ve+/vW3vv73vv73vv70cYO+/vS/fv++/vTPvv71577+9J++/ve+/ve+/vXdYcGN177+977+977+977+9Vu+/vS9t0LnWuy0mCGPvv70+77+9KO+/vSJr77+9Q++/ve+/ve+/vUsuXAXvv70377+9OzvWvwjvv73vv73vv73vv71oYR/vv73vv70L77+9aHPvv70C77+977+977+977+9TO+/ve+/vWEt77+9M1cX77+916/vv70177+977+9a++/vcqm77+977+9Mu+/vUDvv73vv73vv71r77+9Wyvvv73vv708Su+/vRxGVnrvv70977+977+9KhkhITNYXO+/vTRdcO+/vcitCgZYVUZ9fO+/ve+/ve+/ve+/vQtR77+9Ze+/vRPZkwMLzqEjD1bvv73vv73vv71w77+977+977+9M1xaZe+/vT1yVVTvv73Kgh7vv71e77+977+9UVRGNO+/vXnvv70D77+9SRnvv70gcxvvv70VTjs8Yu+/vcSOO0Lvv73vv71y77+977+977+977+977+9IHsnW0/vv71XP++/vRHvv73vv73vv71777+977+977+9TE4977+92rR777+9PW/vv73vv71sQe+/vVgj77+9B++/veKHgyvvv71x77+9UO+/ve+/vRHvv70X77+977+9ae+/vXfvv73vv73vv73vv70L77+9W++/ve+/vSJ977+9x4/vv73vv71scFF/Du+/vWjvv706PV81W++/vU7vv73vv73vv71TYB1XDxJ+77+977+9Du+/vRxn77+977+977+977+977+977+9REd177+9Qjbvv71XEmnvv70A77+977+977+977+9RSYXI++/vVbvv70777+9A++/vUMf77+977+9RSHvv73vv73vv73vv70A77+977+9RO+/ve+/ve+/vW3vv73vv70877+977+91Kzvv71w77+977+9e++/ve+/vV3vv73vv70477+9T05/77+9aibvv70j77+977+9fD3vv71m77+977+9A++/vUc/77+9Be+/vWVQ77+977+9K0bvv70T77+9Su+/vTvvv71577+9Ru+/vVLvv70VBFklUe+/vXxH77+9cO+/vRkxWjYAfu+/ve+/vSnvv70077+977+9FVfvv71UGTvvv71I77+9KO+/vUBN2ZwV37BVW++/vR/vv71U77+977+977+9G++/vX/vv70H77+9I++/vUdiT++/vSp777+9dCVPe++/ve+/ve+/vRfvv70dX++/ve+/vVLvv70A77+977+977+977+9Ye+/vVTvv712IjsSf0lBVO+/vVfvv73vv71B77+9T3Yb77+9JT3vv73vv73vv71577+9Wz7vv70f2pxZOH0f77+9eu+/vQB5LO+/vU1lbu+/vS/vv73vv70yPu+/ve+/vRLvv709Ke+/ve+/ve+/vXJW77+977+9V3bvv708ZWzvv71FUg9a77+9ee+/vdOS77+9eO+/vVXvv70LFu+/vUp9Zkp8HO+/ve+/vR4w77+9f++/vSUhCu+/vU/vv70E77+9ABNX77+977+977+9ae+/vQPvv70K77+9JO+/ve+/vRh+Et2z77+9eO+/vRjvv71J77+9Tznvv70ARO+/ve+/ve+/vUx9Wkl977+977+9ypA+XzQvH++/vTzvv70q77+9GER7Gu+/ve+/vVTvv70r77+977+977+977+9W++/vS1U77+9Bu+/ve+/vVwxDjLvv73vv73vv73vv70yYe+/vX1tbBHvv73vv73vv73vv73vv70EI++/ve+/vR/vv73Tm++/ve+/ve+/ve+/vRVxV++/vS7vv70cQe+/ve+/ve+/ve+/ve+/vSrvv70277+9Ye+/vSTvv73vv70K77+977+977+977+9dwY0Ru+/ve+/vXXvv73vv73vv70h77+9FAwnc++/vS7vv73vv71sTBzvv73vv71KWUwMWnxP77+9N1bvv70p77+977+9eTvvv73Ksu+/vcmq77+977+977+9N0Tvv71uZwjvv73vv73vv73vv70fXu+/vWbvv706Zu+/ve+/ve+/vWHvv73aoX4CXm80z5Tvv73vv71xPzTvv71cc++/vRUv77+9YCB3Ce+/ve+/vVfvv70m77+9P++/ve+/vWvvv73vv73vv71lPe+/ve+/ve+/vR1L77+977+9Fu+/vUo877+9bu+/ve+/ve+/ve+/ve+/ve+/vSLvv73vv70gbsaL77+9RXR277+977+9CO+/ve+/vUFV77+977+9YwTvv73vv73vv73vv71HEe+/ve+/vcqDGz3vv73vv70Adu+/vTvvv71lFBk477+9de+/ve+/ve+/ve+/vdyrCWPvv71xdu+/ve+/vQzvv70wCV9e77+9Tu+/vSoc77+977+977+9Se+/vXfkrKnvv73vv71477+9UBULRO+/vVDvv70q77+9Du+/vXcf77+977+9QFTvv73vv73vv71dV++/ve+/ve+/vRtnZu+/ve+/vXVK77+92KPvv71i77+9ah/vv73vv73vv73vv73vv73TqTAHdu+/ve+/ve+/vS9DR++/vXxRJBzvv71h77+9dXVecz1kD++/ve+/vR5Id1NC7ZqTZE1qQu+/ve+/vQXvv73vv73vv706JO+/vRTvv70ARe+/vXY5HU3vv73vv73vv71l77+977+977+977+977+977+977+977+9K++/vVhu4K+jUe+/vXgOMu+/vVvvv73vv73vv73vv70/FSDvv71o77+977+9I++/vQLvv73vv73vv71o77+977+9G++/ve+/ve+/ve+/ve+/ve+/vUw5N0R2S2Qj77+9YUF777+9PO+/vSBuRjskKc+rOO+/vShZ77+9KO+/vWVp77+9Uu+/ve+/vWPYnu+/ve+/ve+/vSUgblnvv71yTmHvv73HuQrvv70C77+9dlbvv70077+9Fd6W77+9SsKMLu+/vXZP77+9KeKWre+/ve+/ve+/vXHvv70hbkrvv71/77+9f++/vSrvv71V77+977+9Qu+/vRYV77+9Ve+/ve+/vSTvv70PcVPvv70X77+9Ru+/vWfvv70lWu+/vW3vv71W77+977+9XQrvv70L77+977+9JO+/vQs0Me+/vUx/El8f77+9GU3vv73vv70AMk8QPyXvv73vv73vv73vv73vv73vv73Gvu+/ve+/ve+/ve+/vUbvv71IVe+/ve+/ve+/vT/vv71V2q17K0Dvv710Ge+/vXvvv71Dce+/vVDvv73vv73vv71b77+9KVvvv71i77+977+977+977+977+9Su+/vQjvv73vv73vv73vv70M77+9NWPvv70HIe+/vVHvv73vv71Q77+9ABLvv70K77+977+9GTEj77+9cjvvv70/BXjvv70n77+9EO+/vXcOQVA6Cu+/ve+/vQDvv71H77+9RO+/vSbvv73etO+/vXfvv73vv73vv71pCnM2I++/vWpDWe+/vS/vv73vv71+77+977+9Tifvv73vv71K77+9Fe+/vXXWoUjvv73CmAUj77+9OO+/ve+/vXXvv73vv73vv70Z77+9Uu+/ve+/vXZYfO+/ve+/ve+/vQIl77+977+9S++/ve+/ve+/vWbUnu+/ve+/vUrvv71K77+977+977+9aBPYhCbvv71wWO+/vXDvv73vv73vv70bFgzvv73TgO+/vT/vv73SlRvvv70BKSVUx4Tvv71tcT3vv73vv73vv71lFEN177+977+977+9L1Hvv73vv71OKmZm77+977+977+977+977+9Ru+/ve+/vSjvv71H06EqAO+/ve+/vXvvv70V3o9677+9bu+/vRPvv73vv70D77+9Je+/vX/vv73vv70=
 */
//// Tag:
/** 
 * @swagger
 * tags:
 *  name: Point of Interest
 *  description: Point of Interest API management 
 *  
*/
///////// get all points of interest
/**
* @swagger
* /poi/pointsOfInterest:
*   get:
*     summary: Get all points of interest
*     tags: [Point of Interest]
*     description: Retrieve a list of all points of interest.
*     responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/PiointOfInterest'
*       400:
*         description: Bad request
*       404:
*         description: Not found
*       500:
*         description: Server error
*/
///////
/**
 * @swagger
 * /poi/pointsOfInterest:
 *   post:
 *     summary: Create a new Point of Interest
 *     description: Create a new Point of Interest with the given attributes.
 *     tags:
 *       - Point of Interest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/PiointOfInterest'
 *             
 *     responses:
 *       201:
 *         description: POI created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: string
 *                   description: The unique ID of the created POI.
 * 
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 */


export default router;
