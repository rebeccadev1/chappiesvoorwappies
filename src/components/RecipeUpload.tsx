import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { useRecipes, Ingredient } from "@/hooks/use-recipes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface RecipeUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RecipeUpload = ({ open, onOpenChange }: RecipeUploadProps) => {
  const { recipes, addRecipe, deleteRecipe } = useRecipes();
  const [showForm, setShowForm] = useState(false);
  
  // Form states
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [baseServings, setBaseServings] = useState("4");
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: 0, unit: "" }
  ]);
  const [steps, setSteps] = useState<string[]>([""]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: 0, unit: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const resetForm = () => {
    setCategory("");
    setTitle("");
    setDescription("");
    setPrepTime("");
    setBaseServings("4");
    setIsVegan(false);
    setIsVegetarian(false);
    setImageFile(null);
    setImagePreview("");
    setIngredients([{ name: "", amount: 0, unit: "" }]);
    setSteps([""]);
  };

  const handleSubmit = () => {
    if (!category || !title || !prepTime || !imagePreview) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const validIngredients = ingredients.filter(i => i.name && i.amount && i.unit);
    const validSteps = steps.filter(s => s.trim() !== "");

    if (validIngredients.length === 0 || validSteps.length === 0) {
      toast({
        title: "Missing content",
        description: "Please add at least one ingredient and one step",
        variant: "destructive"
      });
      return;
    }

    addRecipe({
      category: category as any,
      title,
      description,
      prepTime: parseInt(prepTime),
      baseServings: parseInt(baseServings),
      isVegan,
      isVegetarian,
      image: imagePreview,
      ingredients: validIngredients,
      steps: validSteps
    });

    toast({
      title: "Recipe added!",
      description: `${title} has been added to ${category}`
    });

    resetForm();
    setShowForm(false);
  };

  if (showForm) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add New Recipe</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Recipe Name *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter recipe name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description"
              />
            </div>

            <div>
              <Label htmlFor="image">Recipe Photo *</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 w-full h-48 object-cover rounded" />
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="prepTime">Prep Time (minutes) *</Label>
                <Input
                  id="prepTime"
                  type="number"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="30"
                />
              </div>

              <div>
                <Label htmlFor="servings">Servings *</Label>
                <Input
                  id="servings"
                  type="number"
                  value={baseServings}
                  onChange={(e) => setBaseServings(e.target.value)}
                  placeholder="4"
                />
              </div>

              <div className="flex flex-col gap-2 justify-end pb-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegetarian"
                    checked={isVegetarian}
                    onCheckedChange={(checked) => setIsVegetarian(checked as boolean)}
                  />
                  <Label htmlFor="vegetarian" className="cursor-pointer">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegan"
                    checked={isVegan}
                    onCheckedChange={(checked) => setIsVegan(checked as boolean)}
                  />
                  <Label htmlFor="vegan" className="cursor-pointer">Vegan</Label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Ingredients *</Label>
                <Button type="button" size="sm" onClick={addIngredient}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={ingredient.amount || ""}
                      onChange={(e) => updateIngredient(index, 'amount', parseFloat(e.target.value))}
                      className="w-24"
                    />
                    <Input
                      placeholder="Unit"
                      value={ingredient.unit}
                      onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                      className="w-24"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                      disabled={ingredients.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Steps *</Label>
                <Button type="button" size="sm" onClick={addStep}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="flex-shrink-0 w-8 pt-2 text-sm text-muted-foreground">
                      {index + 1}.
                    </span>
                    <Textarea
                      placeholder="Describe this step"
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeStep(index)}
                      disabled={steps.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => {
                setShowForm(false);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                <Upload className="h-4 w-4 mr-2" />
                Save Recipe
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">My Recipes</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Button onClick={() => setShowForm(true)} className="w-full mb-4">
            <Plus className="h-4 w-4 mr-2" />
            Upload New Recipe
          </Button>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {recipes.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No recipes uploaded yet. Click "Upload New Recipe" to add your first recipe!
              </p>
            ) : (
              recipes.map((recipe) => (
                <Card key={recipe.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{recipe.title}</CardTitle>
                        <CardDescription className="capitalize">{recipe.category}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          deleteRecipe(recipe.id);
                          toast({
                            title: "Recipe deleted",
                            description: `${recipe.title} has been removed`
                          });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-32 h-32 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{recipe.description}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span>⏱️ {recipe.prepTime} min</span>
                          <span>🍽️ {recipe.baseServings} servings</span>
                          {recipe.isVegan && <span>🌱 Vegan</span>}
                          {recipe.isVegetarian && !recipe.isVegan && <span>🌱 Vegetarian</span>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
