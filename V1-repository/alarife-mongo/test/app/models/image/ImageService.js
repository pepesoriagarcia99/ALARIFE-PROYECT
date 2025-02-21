/* eslint-disable require-jsdoc */
import { AutoWired, Service } from '@alarife/core/decorators';
import { ImageRepository } from './ImageRepository';

@Service
class ImageService {

  @AutoWired(ImageRepository) imageRepository;

  imageService(image) {
    return this.imageRepository.create(image);
  }
}

export default ImageService;
