
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ScanSection = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanResult, setHasScanResult] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the file
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      simulateScanning();
    }
  };

  const simulateScanning = () => {
    setIsScanning(true);
    // Simulate AI processing time
    setTimeout(() => {
      setIsScanning(false);
      setHasScanResult(true);
    }, 2000);
  };

  const handleTakePhoto = () => {
    // In a real app, this would access the camera
    // For our demo, we'll just simulate scanning
    setIsScanning(true);
    setTimeout(() => {
      setUploadedImage('/placeholder.svg'); // Use placeholder as mock photo
      setTimeout(() => {
        setIsScanning(false);
        setHasScanResult(true);
      }, 2000);
    }, 500);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setHasScanResult(false);
  };

  return (
    <section id="scan" className="py-10 bg-muted/50 scroll-mt-16">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-6">Scan Ingredients</h2>
        
        <Card className="overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center space-y-4">
            {!uploadedImage ? (
              <>
                <div className="text-center mb-4">
                  <p className="text-muted-foreground">
                    Take a picture or upload an image of your ingredient to add it to your inventory
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                  <Button 
                    className="flex items-center justify-center gap-2 h-32" 
                    variant="outline"
                    onClick={handleTakePhoto}
                  >
                    <Camera className="h-6 w-6 mb-1" />
                    <span>Take a Picture</span>
                  </Button>
                  
                  <div className="relative flex items-center justify-center h-32 border rounded-md bg-background hover:bg-accent cursor-pointer">
                    <Label 
                      htmlFor="image-upload" 
                      className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                    >
                      <Upload className="h-6 w-6 mb-1" />
                      <span>Upload Image</span>
                    </Label>
                    <Input 
                      id="image-upload" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="sr-only"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="relative w-full max-w-sm mb-4">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded ingredient" 
                    className="w-full h-48 object-cover rounded-md"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                      <div className="text-white text-center">
                        <div className="animate-pulse-slow mb-2">AI analyzing image...</div>
                        <div className="h-1.5 w-36 bg-white/30 rounded-full overflow-hidden mx-auto">
                          <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {hasScanResult ? (
                  <div className="w-full max-w-sm animate-fade-in">
                    <div className="bg-card rounded-md p-4 border mb-4">
                      <h3 className="font-medium mb-2">Scan Results</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <Label className="text-muted-foreground">Item:</Label>
                          <div className="font-medium">Tomatoes</div>
                          
                          <Label className="text-muted-foreground">Quantity:</Label>
                          <div className="font-medium">3 medium</div>
                          
                          <Label className="text-muted-foreground">Best Before:</Label>
                          <div className="font-medium">May 18, 2025</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" onClick={handleReset} className="flex-1">
                        Scan Again
                      </Button>
                      <Button className="flex-1 gap-1">
                        Add to Inventory
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" onClick={handleReset} disabled={isScanning}>
                    Cancel
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ScanSection;
