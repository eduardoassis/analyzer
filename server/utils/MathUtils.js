var MathUtils = function() {
}

MathUtils.CONSTANT_MEGABYTE = 1024;

MathUtils.calculateStandardDeviation = function(numbers, average) {
  
  var result, 
      aux = 0;

  if (Array.isArray(numbers) && numbers.length > 0) {

    numbers.forEach(function(number){
      aux += Math.pow((number - average), 2);      
    });

    result = Math.sqrt( ( (1 / (numbers.length - 1) ) * aux ) );
  }

  return result;
};

MathUtils.convertBytesToMegabyte = function(bytes) {
  return bytes / MathUtils.CONSTANT_MEGABYTE;
};

module.exports = MathUtils;